```cpp
#include <Wire.h>
#include <SD.h>

#define VCC_PIN 3
#define RST_PIN 2
#define DEV_ADDR 0x38
#define FTS_PACKET_LENGTH 2

File myFile;

void initSD(){

  Serial.print("Initializing SD card...");
  // On the Ethernet Shield, CS is pin 4. It's set as an output by default.
  // Note that even if it's not used as the CS pin, the hardware SS pin 
  // (10 on most Arduino boards, 53 on the Mega) must be left as an output 
  // or the SD library functions will not work. 
   pinMode(10, OUTPUT);
   
  if (!SD.begin(4)) {Serial.println("initialization failed!");return;}
  Serial.println("initialization done.");

  myFile = SD.open("fw.bin");
  if (myFile) {
  	fts_ctpm_fw_upgrade();
    // read from the file until there's nothing else in it:
    myFile.close();
  } else {
  	// if the file didn't open, print an error:
    Serial.println("error opening");
  }


}

void setup(){
	Wire.begin();
  	Serial.begin(9600);
  	init_device();
  	initSD();
  	
}

void loop(){}

void init_device() {
  pinMode(VCC_PIN, OUTPUT);
  pinMode(RST_PIN, OUTPUT);
  digitalWrite(RST_PIN, HIGH);
  digitalWrite(VCC_PIN, HIGH);
}

int cmd_write(byte *a, int n){
        Wire.beginTransmission(DEV_ADDR);
        Wire.write(a,n);
        assert(Wire.endTransmission(DEV_ADDR));
}
 
int byte_read(byte* pbt_buf, int bt_len){
        int r=0;
        byte d=0xFF;
        Wire.requestFrom(DEV_ADDR, bt_len);
        while(Wire.available()){
                d=Wire.read();
                pbt_buf[r]=d;
                Serial.print(d,HEX);
                r++;
        }
}

byte i2c_smbus_read_i2c_block_data(byte command, int length, byte *values)
{
	byte r=0, d=0xFF;
  Wire.beginTransmission(DEV_ADDR);
  Wire.write(command);
  assert(Wire.endTransmission(DEV_ADDR));
  Wire.requestFrom(DEV_ADDR, length);
  while (Wire.available()) {
  	d=Wire.read();
  	values[r]=d;
    Serial.print(d, HEX);
    r++;
  }
}
 
void assert(int e){ if(e){ Serial.print("[E");Serial.print(e);Serial.print("]"); } }

/*
while (myFile.available() && i++<10) {
    	Serial.print(myFile.read(),HEX);Serial.println(" ");
    }
    // close the file:
    
*/

boolean  fts_ctpm_fw_upgrade(/*byte* pbt_buf, unsigned int dw_lenth*/){
	unsigned int dw_lenth = myFile.size();
    byte reg_val[2] = {0};
    byte tmpData[4] = {0,0,0,0};
    unsigned int i = 0;
 
    unsigned int  packet_number;
    unsigned int  j;
    unsigned int  temp;
    unsigned int  lenght;
    byte  packet_buf[FTS_PACKET_LENGTH + 6];
    byte  auc_i2c_write_buf[10];
    byte bt_ecc;
    int i_ret;
        int ret;
        unsigned char ver;
 
    /*********Step 1:Reset  CTPM *****/
        pinMode(RST_PIN, OUTPUT);
    digitalWrite(RST_PIN, LOW);  
    delay(10);  
    pinMode(RST_PIN, OUTPUT);
    digitalWrite(RST_PIN, HIGH);
    Serial.println("[TSP] Step 1: Reset CTPM test");
   
    delay(50);  
    /*********Step 2:Enter upgrade mode *****/
    auc_i2c_write_buf[0] = 0x55;
    auc_i2c_write_buf[1] = 0xaa;
    do{
        i ++;
        i_ret = cmd_write(auc_i2c_write_buf, 2);
        delay(5);
    }while(i_ret <= 0 && i < 5 );
    Serial.println("[TSP] Step 2: Enter upgrade mode");
 
    /*********Step 3:check READ-ID***********************/
    tmpData[0]=0x90;
    cmd_write(tmpData,4);
        i=0;
        i_ret=0;
    do{
        i ++;
        i_ret = byte_read(reg_val,2);
        delay(10);
    }while(i_ret <= 0 && i < 5 );
    Serial.print("[TSP] Step 3: check ID: ");
    Serial.print(reg_val[0],HEX);
    Serial.print(", ");
    Serial.print(reg_val[1],HEX);
        Serial.println(" ");
 
    /*********Step 4:erase app*******************************/
    tmpData[0]=0x61;
    ret = cmd_write(tmpData,1);
   
    delay(1500);
    Serial.print("[TSP] Step 4: erase.ret=");
        Serial.print(ret);
        Serial.println(" ");
 
    /*********Step 5:write firmware(FW) to ctpm flash*********/
    bt_ecc = 0;
        Serial.println("[TSP] Step 5: start upgrade.");
    dw_lenth = dw_lenth - 8;
    packet_number = (dw_lenth) / FTS_PACKET_LENGTH;
    packet_buf[0] = 0xbf;
    packet_buf[1] = 0x00;
    for (j=0;j<packet_number;j++){
        temp = j * FTS_PACKET_LENGTH;
        packet_buf[2] = (byte)(temp>>8);
        packet_buf[3] = (byte)temp;
        lenght = FTS_PACKET_LENGTH;
        packet_buf[4] = (byte)(lenght>>8);
        packet_buf[5] = (byte)lenght;
 
        for (i=0;i<FTS_PACKET_LENGTH;i++){
        	myFile.seek(j*FTS_PACKET_LENGTH + i);
            packet_buf[6+i] = myFile.read();
            bt_ecc ^= packet_buf[6+i];
        }
       
        ret=cmd_write( &packet_buf[0],FTS_PACKET_LENGTH + 6);
        if ((j * FTS_PACKET_LENGTH % 1024) == 0){
              Serial.print("[TSP] upgrade the 0x");
              Serial.print(((unsigned int)j) * FTS_PACKET_LENGTH);
              Serial.println(" th byte.");
        }
    }
 
    if ((dw_lenth) % FTS_PACKET_LENGTH > 0){
        temp = packet_number * FTS_PACKET_LENGTH;
        packet_buf[2] = (byte)(temp>>8);
        packet_buf[3] = (byte)temp;
 
        temp = (dw_lenth) % FTS_PACKET_LENGTH;
        packet_buf[4] = (byte)(temp>>8);
        packet_buf[5] = (byte)temp;
 
        for (i=0;i<temp;i++){
        	myFile.seek(packet_number*FTS_PACKET_LENGTH + i);
            packet_buf[6+i] = myFile.read();
            bt_ecc ^= packet_buf[6+i];
        }
             // printk("[TSP]temp 0x%x \n", temp);
        ret = cmd_write( &packet_buf[0],temp+6);    
              //printk("[TSP] 222 ret 0x%x \n", ret);
        delay(20);
    }
 
    //send the last six byte
    for (i = 0; i<6; i++){
        temp = 0x6ffa + i;
        packet_buf[2] = (byte)(temp>>8);
        packet_buf[3] = (byte)temp;
        temp =1;
        packet_buf[4] = (byte)(temp>>8);
        packet_buf[5] = (byte)temp;
        myFile.seek(dw_lenth + i);
        packet_buf[6] = myFile.read();

        bt_ecc ^= packet_buf[6];
 
        cmd_write(&packet_buf[0],7);  
        delay(20);
    }
 
    /*********Step 6: read out checksum***********************/
 
    i2c_smbus_read_i2c_block_data(0xcc, 1, &(reg_val[0]));
    Serial.print("[TSP] Step 6:  ecc read 0x");
    Serial.print(reg_val[0]);
    Serial.print(", new firmware 0x");
    Serial.print(bt_ecc);
    Serial.println(".");
    if(reg_val[0] != bt_ecc){
        //return ERR_ECC;
    }
 
    /*********Step 7: reset the new FW***********************/
    pinMode(RST_PIN, OUTPUT);
    digitalWrite(RST_PIN, LOW);  
    delay(1);  
    pinMode(RST_PIN, OUTPUT);
    digitalWrite(RST_PIN, HIGH);
 
    return true;
}
```
