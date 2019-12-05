---
layout: post
categories: hardware
title: Прошивка тачскрина ft5316
description: История о том, как я запорол тачскрин на своём ZOPO zp980+ и в итоге сделал программатор, прошил тач и больше так не баловался =)
image: photos/ft5316.png
---

Началось всё с того, что мой смартфон ZOPO zp980+ как и у многих его владельцев фантомил при зарядке или перегреве. Фантомы это такие произвольные нажатия на экране, когда сам ничего не делаешь, а на смартфоне что-то делается. Это очень мешает пользоваться устройством. Поэтому полазив на форуме 4PDA решил сменить прошивку в чипе тачскрина FocalTech ft5316.

Несмотря на предостережение красным шрифтом, всё же рискнул. Прошил, перезапустил смартфон и вуаля. Что могло случиться, гарантированно случилось. Фантомы исчезли, а вместе с этим и тачскрин совсем перестал работать.

## Просьба о помощи или источник вдохновения

Нужно было восстанавливать, т.к. цена тачскрина была непозволительно большой: половина стоимости телефона.

Начал пробовать прошить разными приложениями под Android, но ничего не выходило, хоть порой и писалось, что всё ок. Но это разработчик просто не учёл, что могло и не прошиться.

Стоило искать другой путь. Отчаивался, пытался купить у людей, чей смартфон был в нерабочем состоянии, а тачскрин с экраном цел. Но безуспешно.

Обратился за помощью к уважаемому Timmnum, пользователю форума 4PDA:

> — fagci
Приветствую!
Хотел узнать у Вас, что можно сделать с тачем, у меня ft5316...
Прошил чужим бинарником, в итоге определяется как 0x0, после прошивки бинарника, который до этого шился - отображает 0x7 в обоих полях.
Тест поинт (контакты 28/30) замыкал на землю как в момент перевтыкания шлейфа, так и в момент прошивки с воткнутым шлейфом. Результата не достиг.
Нашел бинарник под этот чип, тоже не ставится ни в какую.
Само устройство zp980+, видел на china-iphone под другой 980 модифицированное ядро, цианогенмод11, в котором шьется, но объединить сие для 980+ не могу, спецификация другая.
Прошу направить меня на путь истинный=)

> — Timmnum
Я бы с радостью...) Но заполучить убитый 5316 мне не удавалось.
Есть вариант прошивки через COM - UART. Но тут нужен дамп с рабочего...

> — fagci
А тот бинарник, который ранее шил, работал, его не удастся поставить через COM?..хотя затруднительно будет подпаяться к ногам..
Спасибо большое за разъяснения, попробую тоже провтыкать=)..

Был ещё вариант - собрать из исходников CyanogenMod для zp980+, но нужно сначала найти всё нужное, местами подправить, компилить...Компилилось без остановки на ноуте дня два. В итоге не завелось и забил.

Далее была переписка с ув. Timmnum, оставил только ключевые моменты и вырезал сообщения Timmnum во избежание жалоб, мало ли =)

> А для нас пока и ЦМ нет... В общем, ковырять-неперековырять=))

> В преобразователях, которые заказал, стоит чип cp2102, у него есть только DSR\RTS DTR\CTS...
Я себе заказал Arduino, на нем есть MISO\MOSI и SDA\SCL, как я понял, SDA это аналоговый выход.
Поэтому сдается мне, что лучше приспособить arduino для общения с контроллером.
Видел, как с помощью него можно прошить другой arduino=)

> Тут недавно пришли нужные детали для коннекта к шлейфу, попробовал запитать контроллер прямо от 3.3в от переходника, чип на нем греется, померил в телефоне какое питание подходит - там 2.8в вообще..теперь непонятно, как быть с этим, может питание вообще взять как-то с тела..
А в даташите написано что operating voltage 2.8-3.6 =)
Запитал от пришедшего с breadboard адаптера питания с "кренкой", на контроллере около 2.8в

> Читаются только нули пока... То есть получается, ответа с контроллера нет...

> С питанием вообще понять не могу=)... До этого подключал неверно, полярность попутал...
Пины шлейфа правильно промаркировал, поэтому в расположении VDDA уверен=)
Подключаю с верной полярностью, напряжение проседает до 1.3в, контроллер греется при этом
Самое странное, что при том же питании с телефона контроллер то не греется=)

Тут уже было отчаялся совсем, но появилась надежда:

> Я ваще наоборот припаял разъем поэтому пины 1..8 = 8..1 =))

> Теперь пока Device not respond.
Соединил dtr, cts напрямую к sda
Уже и через arduino при помощи такой штуки http://playground.arduino.cc/Code/I2CEEPROM
читаю, данных нет, одни FF

> Когда замыкал reset на землю, нули не читались, значит контроллер еще жив=))

> Походу что-то не так делаю, ACK же получаю..не сгорел же=(

Снова руки опускались, но я не сдавался!

> На данный момент имею ардуинку в режиме мастера, которая общается через I2C с контроллером.
Только вчера заюзал кастом драйвер от Paolo (для ft5316 под CM для zp980), модифицировал под arduino и не представляешь, уже читаются НЕ нули=)..и даже не то что отправлял, значит кушает=)
Осталось дело за кропотливым..переписать индусокод более тщательно, чтобы ничего не забыть, подцепить SD карточку и можно уже будет передавать прошивку.
Останется только решить проблему с памятью под прошивку, придется читать побайтово, или маленькими пачечками, а то у ардуинки не хватит места для всей=)

> Питание подаю на ардуинку 3.3в, хотя надо 5..интерфейсы оказались согласованными=)
ACK до этого принимал, значит был контакт уже=)
Уже думал, что спалил тач, а оказалось, что еще надо ввести в нужный режим девайс и не обязательно использовать WAKE. Кстати, у этого контроллера INT на том же пине, что и WAKE=)

> Кстати, самое странное, что WAKE не теребил вовсе. только ресет и потом чуть иначе команды шлются=)

## Что получилось в итоге

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

Больше так делать не буду. Возможно =)

С этого я получил несколько важных уроков:

- никогда нельзя опускать руки, особенно когда кажется, что все методы перепробованы;
- если хоть кто-нибудь говорит на форумах, что бесполезно искать решение — не поддаваться;
- всё можно сделать самому, важно верить в свои силы, даже когда их нет!

Всем, кому пригодится данный материал, желаю успехов в восстановлении и чтобы ничего не ломалось, а только улучшалось. А если и ломается, то восстанавливалось! Это бесценный опыт.
