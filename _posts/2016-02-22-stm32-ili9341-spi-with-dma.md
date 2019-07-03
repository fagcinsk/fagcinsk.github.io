---
layout: post
comments: true
category: hardware
title: STM32 ILI9341 SPI with DMA
tags: stm32 ili9341
---

Долго возился с подключением DMA на STM32f103, в итоге удалось завести следующим образом:  

```cpp
u8              dmaWorking = 0;
DMA_InitTypeDef dma8, dma16;

void dmaInit() {
    RCC_AHBPeriphClockCmd(RCC_AHBPeriph_DMA1, ENABLE);

    // DMA 8bit
    DMA_StructInit(&dma8);
    dma8.DMA_PeripheralBaseAddr = (u32) &(SPI1->DR);
    dma8.DMA_DIR                = DMA_DIR_PeripheralDST;
    dma8.DMA_MemoryInc          = DMA_MemoryInc_Enable;
    dma8.DMA_PeripheralDataSize = DMA_PeripheralDataSize_Byte;
    dma8.DMA_MemoryDataSize     = DMA_MemoryDataSize_Byte;
    dma8.DMA_Priority           = DMA_Priority_High;

    // DMA 16bit
    DMA_StructInit(&dma16);
    dma16.DMA_PeripheralBaseAddr = (u32) &(SPI1->DR);
    dma16.DMA_DIR                = DMA_DIR_PeripheralDST;
    dma16.DMA_MemoryInc          = DMA_MemoryInc_Enable;
    dma16.DMA_PeripheralDataSize = DMA_PeripheralDataSize_HalfWord;
    dma16.DMA_MemoryDataSize     = DMA_MemoryDataSize_HalfWord;
    dma16.DMA_Priority           = DMA_Priority_High;

    // IRQs
    NVIC_EnableIRQ(DMA1_Channel3_IRQn);
    DMA_ITConfig(DMA1_Channel3, DMA_IT_TC, ENABLE);
    SPI_I2S_DMACmd(SPI1, SPI_I2S_DMAReq_Tx, ENABLE);
}

void dmaSend(u8 *data, u32 n) {
    dma8.DMA_MemoryBaseAddr = (u32) data;
    dma8.DMA_BufferSize     = n;
    DMA_Init(DMA1_Channel3, &dma8);
    dmaWorking = 1;
    TFT_CS_RESET;
    DMA_Cmd(DMA1_Channel3, ENABLE);
}

void dmaSend16(u16 *data, u16 n) {
    dma16.DMA_MemoryBaseAddr = (u32) data;
    dma16.DMA_BufferSize     = n;
    DMA_Init(DMA1_Channel3, &dma16);
    dmaWorking = 1;
    TFT_CS_RESET;
    DMA_Cmd(DMA1_Channel3, ENABLE);
}

#define dmaWait() while(dmaWorking);

void dmaSendData8(u8 *data, u16 n) {
    TFT_DC_SET;
    dmaSend(data, n);
    dmaWait();
}

void dmaSendData16(u16 *data, u16 n) {
    TFT_DC_SET;
    dmaSend16(data, n);
    dmaWait();
}

// TX
void DMA1_Channel3_IRQHandler(void) {
    if (DMA_GetITStatus(DMA1_IT_TC3)) {
        DMA_ClearITPendingBit(DMA1_IT_TC3);
        DMA_Cmd(DMA1_Channel3, DISABLE);
        TFT_CS_SET;
        dmaWorking = 0;
    }
}

void dmaSendCmd(u8 cmd) {
    TFT_DC_RESET;
    dmaSend(&cmd, 1);
    dmaWait();
}
```

ссылка на библиотеку: [Github](https://github.com/fagcinsk/stm-ILI9341-spi)
