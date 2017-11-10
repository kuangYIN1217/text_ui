/**
 * 文本分类
 * Created by Administrator on 2017/7/6 0006.
 */

import {Component, Input} from '@angular/core'
declare var echarts: any;
@Component({
  selector: 'ele-text-category',
  styleUrls: ['./text.category.component.css'],
  templateUrl: './text.category.component.html'
})
export class TextCategoryComponent {
  @Input() d_word_list:any;
  ngOnChanges(...args: any[]) {
    //console.log(this.d_value);
    this.initEcharts();
  }
  ngOnInit() {
    this.initEcharts();
  }
  initEcharts() {
// 获取data数据
    let xAxis_data = [];
    let series_data = [];
    let colorList = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
    let colorList_index = 0;
    for (let i = 0 ; i < this.d_word_list.length ; i++) {
      xAxis_data.push(this.d_word_list[i].des);
      series_data.push({
        value: this.d_word_list[i].ratio,
        itemStyle: {
          normal: {
            color: colorList[colorList_index]
          }
        }
      })
      colorList_index ++;
      if (colorList_index === colorList.length) {
        colorList_index = 0;
      }
    }
    // 基于准备好的dom，初始化echarts实例
    console.log(xAxis_data);
    var myChart = echarts.init(document.querySelector('.echarts-text-category'));
    // 绘制图表
    myChart.setOption({
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
          type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
    /*  grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },*/
      xAxis : [
        {
          type : 'category',
          data : xAxis_data,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            interval:0
          }
        }
      ],
      yAxis : [
        {
          type : 'value'
        }
      ],
      series : [
        {
          type:'bar',
          barWidth: '60%',
          data:series_data
        }
      ]
    });
  }
}
