<!--
 * @Author: your name
 * @Date: 2020-07-28 14:02:42
 * @LastEditTime: 2020-08-05 19:11:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \taibao\src\components\draggableList.vue
--> 
<template>
  <draggable v-model="titleBar" @add="addInfo" class='draggableMain tab' :options="{group: {name: 'a', pull:'false'}}">
    <div v-for='(item, index) in  titleBar' :key='index' @click="serchIndex(index)"
      :class="{'active' :index === showIndex}">
      <div>
        <span>
          {{item.cName || item.quota_name}}
          <span v-if="item.compareMonth === '12'">(同比) </span>
          <span v-if="item.compareMonth === '1'">(环比) </span>
        </span>
        <div class='action'>
          <el-popover v-if="item.order !== '3'" placement="bottom-start" width="400" v-model="item.isShow"
            trigger="manual">
            <!-- 弹框整体内容 -->
            <div class="main">
              <div :class="{mask: item.compareMonth}"></div>
              <div class="fixation">
                <div>
                  <div class="item">
                    <span>指标名称：</span>
                    <div class="right">
                      {{item.quota_name}}
                    </div>
                  </div>
                </div>
                <div>
                  <div class="item">
                    <span>指标名称：</span>
                    <div class="right">
                      <el-input size="mini" @change="e=>changeName(e, item, 'cName')" v-model="item.cName"
                        :maxlength="50"></el-input>
                    </div>
                  </div>
                </div>
              </div>
              <div class="fixation">
                <div>
                  <div class="item">
                    <span>固定条件：</span>
                    <div class="right autoChild">
                      <el-button :type="item.type === 'census' ? 'primary': ''" size="mini"
                        @click="$set(item,'type', 'census')">统计</el-button>
                      <el-button :type="item.type === 'screen' ? 'primary': ''" size="mini"
                        @click="$set(item,'type', 'screen')">筛选</el-button>
                    </div>
                  </div>
                </div>
                <!-- <div v-if="item.type !== 'census'">
                  <div class="item">
                    <span>结算月：</span>
                    <div class="right">
                      <el-date-picker v-model="item.comDate" type="month" style="width: 100%" size="mini"
                        value-format='yyyy-MM' placeholder="选择日期"></el-date-picker>
                    </div>
                  </div>
                </div> -->

                <div>
                  <div class="item">
                    <span>结算月：</span>
                    <div class="right autoChild">
                      <el-date-picker v-model="item.comDate1" type="month" style="width: 100%" size="mini"
                        value-format='yyyy-MM' placeholder="选择日期"></el-date-picker>
                      <span v-if="item.showDate">~</span>
                      <el-date-picker v-if="item.showDate" v-model="item.comDate2" type="month" style="width: 100%"
                        size="mini" value-format='yyyy-MM' placeholder="选择日期"></el-date-picker>
                    </div>
                    <span class="rightButton">
                      <i class="iconwendangguanlixitong-zhankaitubiao iconfont" v-if="item.showDate"
                        @click="$set(item,'showDate' , !item.showDate)"></i>
                      <i class="iconwendangguanlixitong-zhankaitubiaobeifen iconfont" v-else
                        @click="closeMessage(item, 'showDate',!item.showDate, 'comDate2' )"></i>
                    </span>
                  </div>
                </div>
                <div v-if="item.type !== 'census'">
                  <div class="item">
                    <span>是否选择：</span>
                    <div class="right">
                      <switch-info v-model="item.isQuota" @change="e=>$set(item, 'isQuota', e ? '1': '0' )" showText='是'
                        hideText='否' />
                    </div>
                  </div>
                </div>
                <div v-if="item.type === 'census'">
                  <div class="item">
                    <span>计数类型：</span>
                    <div class="right autoChild">
                      <el-button :type="item.numType === 'sum' ? 'primary': ''" size="mini"
                        @click="$set(item,'numType', 'sum')">求 和</el-button>
                      <el-button :type="item.numType === 'avg' ? 'primary': ''" size="mini"
                        @click="$set(item,'numType', 'avg')">平均值</el-button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="fixation">
                <div>
                  <div class="item">
                    <span>过滤条件：</span>
                    <div class="right">
                      <el-select v-model="normInfo" style="width: 100%" clearable placeholder="请选择" size="mini">
                        <el-option v-for="(item,index) in  normList" :key="index" :value="JSON.stringify(item)"
                          :label='item.cname'>
                        </el-option>
                      </el-select>
                    </div>
                  </div>
                  <i class="el-icon-plus" @click="addNor(item)"></i>
                </div>
              </div>
              <draggable element='ul' v-model="item.list" :options="{group: {name: 'a', pull:'false'}, sort: false}">
                <li v-for="(key, num) in  item.list" :key="num">
                  <!-- jobcode -->
                  <template v-if="key.input_type === 'jobcode'">
                    <div class="jobCodeInfo">
                      <span>
                        {{key.cname || key.quota_name}}：
                      </span>
                      <div>
                        <el-select @change="(e)=>selectChange(key, e)" v-model="key.valueInfo" multiple
                          style="width: 100%" placeholder="请选择" size="mini">
                          <el-option v-for="(val, j) in key.child" :key="j" :value="JSON.stringify(val)"
                            :label="val.codename"></el-option>
                        </el-select>
                        <el-date-picker v-model="key.date" size="mini" type="month" value-format='yyyy-MM'
                          style="width: 100%" placeholder="选择月">
                        </el-date-picker>
                      </div>
                    </div>
                  </template>
                  <!-- age -->
                  <template v-if="key.input_type === 'age'">
                    <div class="ageInfo">
                      <span>
                        {{key.cname || key.quota_name}}：
                      </span>
                      <div>
                        <div class="top">
                          <div class='han hanborder'>
                            <el-input oninput="value=value.replace(/[^\d]/g,'')" @change='changeAge(key, "age_start")'
                              size="mini" v-model="key.age_start"></el-input>
                            <el-button :type='key.exp1 === "1"? "primary": ""'
                              @click='key.exp1 = key.exp1 === "1" ? "0" : "1"' class='isSHow' size='mini'>含</el-button>
                          </div>
                          <span style='padding: 10px'> - </span>
                          <div class='han hanborder'>
                            <el-input oninput="value=value.replace(/[^\d]/g,'')" @change='changeAge(key, "age_end")'
                              size="mini" v-model="key.age_end"></el-input>
                            <el-button :type='key.exp2 === "1" ? "primary": ""' class='isSHow' size='mini'
                              @click='key.exp2 = key.exp2 === "1" ? 0 : "1"'>含</el-button>
                          </div>
                        </div>
                        <div class="bottom">
                          <el-date-picker v-model="key.date" size="mini" type="month" value-format='yyyy-MM'
                            style="width: 100%" placeholder="选择月">
                          </el-date-picker>
                        </div>
                      </div>
                    </div>
                  </template>
                  <!-- joindate -->
                  <template v-if="key.input_type === 'joindate'">
                    <div class="joindate">
                      <span> {{key.cname || key.quota_name}}：</span>
                      <div>
                        <el-date-picker v-model="key.startdate" type="date" size="mini"
                          @change='changeDate(key, "startdate")' value-format='yyyy-MM-dd' placeholder="选择日期">
                        </el-date-picker>-
                        <el-date-picker v-model="key.enddate" type="date" size="mini"
                          @change='changeDate(key, "enddate")' value-format='yyyy-MM-dd' placeholder="选择日期">
                        </el-date-picker>
                      </div>
                    </div>
                  </template>
                  <!-- select -->
                  <template v-if="key.input_type === 'select'">
                    <div class="selectInfo">
                      <span>{{key.cname || key.quota_name}}：</span>
                      <div>
                        <el-select v-model="key.valueInfo" multiple style="width: 240px" placeholder="请选择" size="mini"
                          v-if="key.val !== '13'" @change="(e)=>selectChange(key, e)">
                          <el-option v-for="(val, j) in key.child" :key="val.val" :label="val.codename"
                            :value="JSON.stringify(val)"></el-option>
                        </el-select>
                      </div>
                    </div>
                  </template>
                  <!-- radio -->
                  <template v-if="key.input_type === 'radio'">
                    <div class="radioInfo">
                      <span>{{key.cname || key.quota_name}}：</span>
                      <div>
                        <!-- <el-select v-model="key.value" style="width: 240px" placeholder="请选择" size="mini"
                          @change="e=> changeRadio(e, key)">
                          <el-option v-for="(val, j) in key.child" :key="val.codevalue" :label="val.codename"
                            :value="val.codevalue"></el-option>
                        </el-select> -->
                        <el-button @click='changeRadio(val.codevalue, key)' v-for="(val, j) in key.child" size="mini"
                          :type="key.value === val.codevalue? 'primary': ''">{{val.codename}}</el-button>
                      </div>
                    </div>
                  </template>
                  <!-- comdate  结算月-->
                  <template v-if="key.input_type === 'comdate'">
                    <div class="comdateInfo">
                      <span>{{key.cname || key.quota_name}}：</span>
                      <div>
                        <div class="item">
                          <el-button :type="key.exp === 'sum' ? 'primary' :''" size='mini' @click='key.exp = "sum"'>求和
                          </el-button>
                          <el-button :type="key.exp === 'avg' ? 'primary' :''" size='mini' @click='key.exp = "avg"'>求均
                          </el-button>
                        </div>
                        <div class="item">
                          <el-date-picker v-model="key.startdate" type="month" style="width: 105px" size="mini"
                            value-format='yyyy-MM' class='comdate' @change='changeDate(key, "startdate")'
                            placeholder="选择日期">
                          </el-date-picker> ~
                          <el-date-picker v-model="key.enddate" type="month" style="width: 105px" size="mini"
                            class='comdate' @change='changeDate(key, "enddate")' value-format='yyyy-MM'
                            placeholder="选择日期">
                          </el-date-picker>
                        </div>
                      </div>
                    </div>
                  </template>
                  <!-- exp -->
                  <template v-if="key.input_type === 'exp'">
                  </template>
                  <!-- expByType -->
                  <template v-if="key.input_type === 'expByType'">
                    <div class="expByType">
                      <div class="title">
                        <span>{{key.cname || key.quota_name}}：</span>
                        <div>
                          <el-button size="mini" :type="key.cal_type === 'sum' ? 'primary' :'' "
                            @click="$set(key,'cal_type' , 'sum')">统计</el-button>
                          <el-button :disabled='key.cal_way === "sum"' size="mini"
                            :type="key.cal_type === 'count' ? 'primary' :'' " @click="$set(key, 'cal_type', 'count')">筛选
                          </el-button>
                        </div>
                      </div>
                      <div class="sum" v-if="key.cal_type === 'sum'">
                        <div class="addList">
                          <span>结算月： </span>
                          <div>
                            <el-date-picker v-model="key.startdate" type="month" style="width: 105px" size="mini"
                              class='comdate' @change='changeDate(key, "startdate")' value-format='yyyy-MM'
                              placeholder="选择日期">
                            </el-date-picker>
                            <span v-if="key.showDate">~</span>
                            <el-date-picker v-show="key.showDate" v-model="key.enddate" type="month"
                              style="width: 105px" size="mini" class='comdate' @change='changeDate(key, "enddate")'
                              value-format='yyyy-MM' placeholder="选择日期">
                            </el-date-picker>
                          </div>
                          <i class="iconwendangguanlixitong-zhankaitubiao iconfont" v-if="key.showDate"
                            @click="$set(key,'showDate' , !key.showDate)"></i>
                          <i class="iconwendangguanlixitong-zhankaitubiaobeifen iconfont" v-else
                            @click="closeMessage(key, 'showDate','enddate' )"></i>
                        </div>
                        <div>
                          <span>计数类型：</span>
                          <div>
                            <el-button size="mini" :type="key.expByType === 'sum'? 'primary': ''"
                              @click="$set(key,'expByType','sum')">求和</el-button>
                            <el-button size="mini" :type="key.expByType === 'avg'? 'primary': ''"
                              @click="$set(key,'expByType','avg')">平均值</el-button>
                          </div>
                        </div>
                        <div>
                          <span>计数结果：</span>
                          <div class="callNumber">
                            <div>
                              <el-input class="pInput" v-model="key.value1" size="mini"
                                oninput="value=value.replace(/[^\d]/g,'')">
                              </el-input>
                              <div>
                                <span :class="key.exp1 === '<' ? 'active': ''" @click="()=>$set(key, 'exp1', '<')"> &lt;
                                </span>
                                <span :class="key.exp1 === '=' ? 'active': ''" @click="()=>$set(key, 'exp1', '=')"> =
                                </span>
                                <span :class="key.exp1 === '<=' ? 'active': ''" @click="()=>$set(key, 'exp1', '<=')"> ≤
                                </span>
                              </div>
                            </div>
                            <span>
                              计数结果
                            </span>
                            <div v-if="key.showNum">
                              <el-input class="pInput" v-model="key.value2" size="mini"
                                oninput="value=value.replace(/[^\d]/g,'')">
                              </el-input>
                              <div>
                                <span :class="key.exp2 === '<' ? 'active': ''" @click="()=>$set(key, 'exp2', '<')"> &lt;
                                </span>
                                <span :class="key.exp2 === '=' ? 'active': ''" @click="()=>$set(key, 'exp2', '=')"> =
                                </span>
                                <span :class="key.exp2 === '<=' ? 'active': ''" @click="()=>$set(key, 'exp2', '<=')"> ≤
                                </span>
                              </div>
                            </div>
                            <i class="iconwendangguanlixitong-zhankaitubiao iconfont" v-if="key.showNum"
                              @click="$set(key,'showNum' , !key.showNum)"></i>
                            <i class="iconwendangguanlixitong-zhankaitubiaobeifen iconfont" v-else
                              @click="closeMessage(key, 'showNum','value2', 'exp2' )"></i>
                          </div>
                        </div>
                      </div>
                      <div class="count" v-if="key.cal_type === 'count'">
                        <div>
                          <span>结算月：</span>
                          <div>
                            <el-date-picker v-model="key.comdate" type="month" style="width: 100%" size="mini"
                              value-format='yyyy-MM' placeholder="选择日期">
                            </el-date-picker>
                          </div>
                        </div>
                        <div>
                          <span>是否：</span>
                          <div>
                            <switch-info v-model="key.isQuota" @change="e=>changeS(e,key, 'isQuota')" showText='是'
                              hideText='否' />
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <i class="el-icon-minus" style="margin-top: 10px" @click="deleteItem(item, num)"></i>
                </li>
              </draggable>
            </div>
            <!-- 底部关闭 -->
            <div class="footerBar">
              <el-button type="primary" size="mini" @click="affirm(item)">确定</el-button>
              <el-button size="mini" type='danger' @click="close(item)">取消</el-button>
            </div>
            <span slot="reference" @click.stop="show(item)">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconicon_bianji"></use>
              </svg>
            </span>
          </el-popover>
          <el-popover placement="bottom-start" width="400" v-model="item.isShow" trigger="manual"
            v-if="item.order === '3'">
            <ul class="columList">
              <li>
                <span>指标名称：</span>
                <div>
                  <el-input v-model="item.quota_name" size="mini" :maxlength='20' style="width: 100%"></el-input>
                </div>
                <i class="el-icon-plus" style="opacity: 0"></i>
              </li>
              <li>
                <span>选择指标：</span>
                <div>
                  <el-select v-model="tagNorm" style="width: 100%" placeholder="请选择" clearable size="mini">
                    <el-option v-for="(val) in titleBar" :key="val.column_code" :label="val.cName || val.quota_name"
                      :value="JSON.stringify(val)" v-if="val.order !== '3'"></el-option>
                  </el-select>
                </div>
                <i class="el-icon-plus" @click="addTag(item, tagNorm, 'tag' )"></i>
              </li>
              <li>
                <span>数据类型：</span>
                <div>
                  <el-select v-model="item.type" style="width: 100%" placeholder="请选择数据类型" clearable size="mini">
                    <el-option value="1" label="整数"></el-option>
                    <el-option value="2" label="小数点"></el-option>
                    <el-option value="3" label='百分比'></el-option>
                  </el-select>
                </div>
                <i class="el-icon-plus" style="opacity: 0"></i>
              </li>
              <li><span>计算符号：</span>
                <div class="numberList">
                  <span :class='sy === symbol ? "active" : ""' v-for="(sy, m) in calculateList" :key="m"
                    @click="symbol = sy">{{sy}}</span>
                </div>
                <i class="el-icon-plus" @click="addTag(item, symbol, 'sym')"></i>
              </li>
              <li>
                <span>指标定义：</span>
                <div class="tag">
                  <el-tag class="tagList" v-for="(tag, h) in item.tagList" :key="h" closable
                    @close="handleClose(item, h)">
                    {{tag.label}}</el-tag>
                </div>
              </li>
            </ul>

            <div style="text-align: center; margin: 0">
              <el-button type="primary" size="mini" @click="tagSubmit(item)">确定</el-button>
              <el-button size="mini" @click="tagClose(item)">取消</el-button>
            </div>
            <span slot="reference" @click.stop="changeColum(item)">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#iconicon_bianji"></use>
              </svg>
            </span>
          </el-popover>
          <span @click.stop="changeEays(item)">
            <i class='iconfont iconbukejian' :style='{color: item.showEs ? "#5EAAFF" : "#EAEAEA", fontSize: "12px"}' />
          </span>
          <span @click.stop="removeItem(index)">
            <i class='iconfont iconicon_shanchu' style='color: pink; font-size: 12px' />
          </span>
        </div>
      </div>
      <!-- 
        底部声场指标展示
        -->
      <ul>
        <li>
          <div>
            <div>
              <span>指标名称：</span>
              <p>{{item.quota_name}}</p>
            </div>
          </div>
        </li>
        <li>
          <div>
            <div>
              <span>固定条件：</span>
              <p>{{item.type === 'census' ? '统计': '筛选'}}</p>
            </div>
            <div v-if="item.type === 'census'">
              <span>结算月：</span>
              <p>{{item.comDate1 }} <span v-if="item.comDate2">~ {{item.comDate2}}</span></p>
            </div>
            <div v-else>
              <span>结算月：</span>
              <p>{{item.comDate}}</span></p>
            </div>
            <div v-if="item.type === 'census'">
              <span>计算类型：</span>
              <p>{{item.numType === 'sum' ? '求和': '求均'}}</p>
            </div>
            <div v-else>
              <span>是否选择：</span>
              <p>{{item.isQuota === '1' ? '是':'否'}}</p>
            </div>
          </div>
        </li>
        <li v-for='(item, index) in item.condition' :key="index">
          <template v-if="item.input_type == 'age'">
            <div class="ageList">
              <div>
                <span>{{item.cname || item.quota_name}}：</span>
                <p>{{item.age_start}} - {{item.age_end}}</p>
              </div>
              <div>
                <span></span>
                <p>{{item.date}}</p>
              </div>
            </div>
          </template>
          <template v-if="item.input_type == 'expByType'">
            <div class="ageList">
              <div>
                <span>{{item.cname || item.quota_name}}：</span>
                <p>{{item.cal_type === 'sum' ? '统计': '筛选'}}</p>
              </div>
              <div v-if="item.cal_type === 'sum'">
                <span>结算月：</span>
                <p>{{item.startdate}} {{item.enddate ? `- ${item.enddate}` : ''}}</p>
              </div>
              <div v-if="item.cal_type === 'sum'">
                <span>计数类型：</span>
                <p>{{item.expByType === 'sum' ? '求和' : '求均'}}</p>
              </div>
              <div v-if="item.cal_type === 'sum'">
                <span>计数结果：</span>
                <p>
                  <span v-if="item.value1"><span
                      style="color: red">{{item.exp1 === '<' ? '大于' : item.exp1 === '=' ? '等于': '大于等于'}}</span>
                    {{item.value1}}</span>
                  <span v-if="item.value2"> , <span
                      style="color: red">{{item.exp2 === '<' ? '小于' : item.exp2 === '=' ? '等于': '小于等于'}}</span>
                    {{item.value2}}</span>
                </p>
              </div>
              <div v-if="item.cal_type !== 'sum'">
                <span>结算月：</span>
                <p>
                  {{item.comdate}}
                </p>
              </div>
              <div v-if="item.cal_type !== 'sum'">
                <span>是否选择：</span>
                <p>
                  {{item.isQuota === '1' ? '是': '否'}}
                </p>
              </div>

            </div>
          </template>
          <template v-if="item.input_type == 'select'">
            <div>
              <div>
                <span>{{item.cname || item.quota_name}}:</span>
                <p>{{item.names.join(',')}}</p>
              </div>
            </div>
          </template>
          <template v-if="item.input_type == 'radio'">
            <div>
              <div>
                <span>{{item.cname || item.quota_name}}：</span>
                <p>{{item.name}}</p>
              </div>
            </div>
          </template>
          <template v-if="item.input_type === 'comdate'">
            <div>
              <div>
                <span>{{item.cname || item.quota_name}}：</span>
                <p>{{item.exp === 'sum' ? '求和': '求均'}}</p>
              </div>
              <div>
                <span>时间：</span>
                <p>{{item.startdate}} - {{item.enddate}}</p>
              </div>
            </div>
          </template>
          <template v-if="item.input_type === 'joindate'">
            <div>
              <div>
                <span>{{item.cname || item.quota_name}}：</span>
                <p>{{item.startdate}} - {{item.enddate}}</p>
              </div>
            </div>
          </template>
          <template v-if="item.input_type === 'jobcode'">
            <div class="jobcode">
              <div>
                <span>{{item.cname || item.quota_name}}：</span>
                <p>{{item.names.join(',')}}</p>
              </div>
              <div>
                <span>时间：</span>
                <p>{{item.date}}</p>
              </div>
            </div>
          </template>
        </li>
      </ul>
    </div>
  </draggable>
</template>
<script>
import draggable from "vuedraggable";
import switchInfo from './switch.vue'
import { getList } from '@/api'
import { deflate } from 'zlib';
export default {
  name: "draggableInfo",
  components: {
    draggable,
    switchInfo
  },
  filters: {
    getValue (value) {
      let name = []
      if (value) {
        value.forEach((item) => {
          name.push(item.cname)
        })
      }
      return name.toString()
    }
  },
  data () {
    return {
      isTrue: false,
      titleBar: [],
      value1: false,
      normList: [],
      normInfo: '', // 缓存当前选择数据
      isShow: false,
      nowNum: 0,
      showIndex: null,
      tagNorm: '',
      calculateList: ["+", "-", "*", "/", "(", ")"],
      symbol: ''
    };
  },
  props: {
    title: {
      type: Array,
      default: () => []
    },
    numInfo: {
      type: Number,
      default: () => 0
    }
  },
  watch: {
    title: {
      handler (val) {
        this.titleBar = JSON.parse(JSON.stringify(val));
      },
      deep: true,
      inserted: true
    },
    numInfo: {
      handler (val) {
        this.nowNum = val
      },
      deep: true,
      inserted: true
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.querySelector("input").focus();
      },
    },
  },
  mounted () {
    getList().then(res => {
      this.normList = res.condition
    })
  },
  methods: {
    changeName (e, item, key) {
      if (Number(e)) {
        this.$message({
          type: 'warning',
          message: '指标名称不能为纯数字'
        })
        this.$set(item, key, '')
      }
    },
    changeInput (val, item, val1) {
      val = val.replace(/[^\d]/g, '')
      if (val >= 0 && val <= 100) {
      } else {
        this.$set(item, val1, '')
      }
    },
    handleClose (val, k) {
      val.tagList.splice(k, 1)
    },
    addTag (item, key, type) {
      if (!key) {
        return
      }
      if (!item.tagList) {
        this.$set(item, 'tagList', [])
      }
      if (type === 'tag') {
        let obj = JSON.parse(key)
        item.tagList.push({
          type: type,
          value: obj.column_code,
          label: obj.cName || obj.quota_name
        })
      } else {
        item.tagList.push({
          type: type,
          value: key,
          label: key
        })
      }
    },
    changeEays (val) {
      this.$set(val, 'showEs', !val.showEs)
    },
    // 标签提交
    tagSubmit (val) {
      let expElements = [], exp = '';
      if (val.tagList) {
        val.tagList.forEach(e => {
          if (e.type === 'tag') {
            expElements.push(e.value)
          }
          exp += e.value
        })
      }
      val.exp = exp
      val.expElements = expElements
      this.tagClose(val)
    },
    // 标签关闭
    tagClose (val) {
      this.$set(val, 'isShow', false)
      this.isShow = false
    },
    removeItem (index) {
      if (this.isShow) {
        this.$message({
          type: 'warning',
          message: '请先关闭操作栏'
        })
        return
      }
      this.$confirm('此操作将删除该指标, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.titleBar.splice(index, 1);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    serchIndex (val) {
      this.showIndex = val
    },
    changeS (e, key, val) {
      let isTrue = e ? '1' : '0'
      this.$set(key, val, isTrue)
    },
    // 改变radio
    changeRadio (e, item) {
      item.value = e
      this.$set(item, 'value', e)
      item.child.forEach(val => {
        if (e === val.codevalue) {
          item.name = val.codename
        }
      })
    },
    //选择条件添加信息
    addNor (item) {
      let data = []
      if (!this.normInfo) {
        this.$message({
          type: 'warning',
          message: '请选择指标'
        })
        return
      }
      let message = JSON.parse(this.normInfo)
      if (message.input_type === 'expByType') {
        this.$set(message, 'cal_type', 'sum')
        this.$set(message, 'expByType', 'sum')
        this.$set(message, 'exp1', '<')
        this.$set(message, 'exp2', '<')
        this.$set(message, 'enddate', '')
        this.$set(message, 'showNum', false)
        this.$set(message, 'showDate', false)
      } else if (message.input_type === 'radio') {
        this.$set(message, 'value', null)
      }
      item.list.push(message)
    },
    // 删除当前条
    deleteItem (item, index) {
      this.$confirm('此操作将删除该筛选条件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        item.list.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    show (item) {
      let data = []
      if (item.condition) {
        data = JSON.parse(JSON.stringify(item.condition))
      }
      this.$set(item, 'list', data)
      if (this.isShow) {
        this.$message({
          type: 'warning',
          message: '请先关闭其他操作栏'
        })
        return
      }
      this.$set(item, 'isShow', true)
      this.isShow = true
    },
    changeColum (item) {
      if (this.isShow) {
        this.$message({
          type: 'warning',
          message: '请先关闭其他操作栏'
        })
        return
      }
      this.$set(item, 'isShow', true)
      this.isShow = true
    },
    addColum (val) {
      this.normInfo = ''
      this.tagNorm = ''
      val.column_code = this.createCellPos(this.nowNum)
      this.titleBar.push(val)
      this.nowNum++
    },
    // 同比
    together () {
      if (this.titleBar.length >= 50) {
        this.$message({
          type: 'warning',
          message: '指标不能超过50个'
        })
        return
      }
      let obj = JSON.parse(JSON.stringify(this.titleBar[this.showIndex]))
      if (obj.condition) {
        for (const item of obj.condition) {
          if (item.isCompare === '1') {
            for (let key in item) {
              if (isNaN(item[key]) && !isNaN(Date.parse(item[key]))) {
                let d = new Date(item[key])
                d.setMonth(d.getMonth() - 12)
                item[key] = this.getDate(d, item[key].length > 7)
              }
            }
          }
        }
      }
      for (const item in obj) {
        if (isNaN(obj[item]) && !isNaN(Date.parse(obj[item]))) {
          let d = new Date(obj[item])
          d.setMonth(d.getMonth() - 12)
          obj[item] = this.getDate(d, obj[item].length > 7)
        }
      }
      obj.compareMonth = '12'
      obj.column_code = this.createCellPos(this.nowNum)
      obj.showMask = true
      this.titleBar.push(obj)
      this.nowNum++
      this.$message({
        type: 'success',
        message: '同比成功'
      })
      this.$set(this, 'showIndex', null)
    },
    // 环比
    loop () {
      if (this.titleBar.length >= 50) {
        this.$message({
          type: 'warning',
          message: '指标不能超过50个'
        })
        return
      }
      let obj = JSON.parse(JSON.stringify(this.titleBar[this.showIndex]))
      if (obj.condition) {
        for (const item of obj.condition) {
          if (item.isCompare === '1') {
            for (let key in item) {
              if (isNaN(item[key]) && !isNaN(Date.parse(item[key]))) {
                let d = new Date(item[key])
                d.setMonth(d.getMonth() - 1)
                item[key] = this.getDate(d, item[key].length > 7)
              }
            }
          }
        }
      }
      for (const item in obj) {
        if (isNaN(obj[item]) && !isNaN(Date.parse(obj[item]))) {
          let d = new Date(obj[item])
          d.setMonth(d.getMonth() - 1)
          obj[item] = this.getDate(d, obj[item].length > 7)
        }
      }
      obj.compareMonth = '1'
      obj.column_code = this.createCellPos(this.nowNum)
      obj.showMask = true
      this.titleBar.push(obj)
      this.nowNum++
      this.$message({
        type: 'success',
        message: '环比成功'
      })
      this.$set(this, 'showIndex', null)
    },
    // 点击确认
    affirm (item) {
      let data = JSON.parse(JSON.stringify(item.list))
      item.order = "2"
      item.condition = data
      item.isShow = false
      this.isShow = false
    },
    addMessageInfo () {
      if (this.titleBar.length >= 50) {
        this.titleBar.splice(val.newIndex, 1)
        this.$message({
          type: 'warning',
          message: '指标不能超过50个'
        })
        return
      }
      let obj = this.titleBar[this.showIndex]
      let data = JSON.parse(JSON.stringify(this.titleBar))
      obj.column_code = this.createCellPos(this.nowNum)
      data.push(obj)
      this.$set(this, 'titleBar', data)
      this.$set(this, 'showIndex', null)
      this.nowNum++
      this.$message({
        type: 'success',
        message: '复制成功'
      })
    },
    // 修改时间
    getDate (date, isDate) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = ''
      if (isDate) {
        d = date.getDate();
        d = d < 10 ? ('-0' + d) : ('-' + d);
      }
      return y + '-' + m + d;
    },
    close (item) {
      item.list = []
      item.isShow = false
      this.isShow = false
    },
    addInfo (val) {
      if (this.titleBar.length > 50) {
        this.titleBar.splice(val.newIndex, 1)
        this.$message({
          type: 'warning',
          message: '指标不能超过50个'
        })
        return
      }
      this.$set(this.titleBar[val.newIndex], 'list', [])
      this.$set(this.titleBar[val.newIndex], 'isShow', false)
      this.$set(this.titleBar[val.newIndex], 'type', 'census')
      console.error(this.titleBar[val.newIndex])
      this.$set(this.titleBar[val.newIndex], 'column_code', this.createCellPos(this.nowNum))
      this.nowNum++
      this.$emit('getBack')
    },
    // 改变 select 获取 codevalue 
    selectChange (key, e) {
      key.value = []
      key.names = []
      e.forEach(item => {
        key.value.push(JSON.parse(item).codevalue)
        key.names.push(JSON.parse(item).codename)
      })
    },
    changeDate (item, val, e) {
      let isfalse = item.startdate > item.enddate
      if (!item.startdate || !item.enddate) {
        return
      }
      if (isfalse) {
        this.$message({
          type: 'warning',
          message: '起始月不能大于结束月'
        })
        this.$set(item, val, '')
      }
    },
    // 年龄条件进行改变
    changeAge (item, val) {
      let isfalse = Number(item.age_start) > Number(item.age_end)
      if (!item.age_start || !item.age_start) {
        return
      }
      if (isfalse) {
        this.$message({
          type: 'warning',
          message: '起始年龄不能大于结束年龄'
        })
        this.$set(item, val, '')
      }
    },
    closeMessage (key, type, val, val1) {
      this.$set(key, type, !key[type])
      this.$set(key, val, '')
      this.$set(key, val1, '')
    },
    // 数值转化为 a b c
    createCellPos (n) {
      var ordA = "A".charCodeAt(0);
      var ordZ = "Z".charCodeAt(0);
      var len = ordZ - ordA + 1;
      var s = "";
      while (n >= 0) {
        s = String.fromCharCode((n % len) + ordA) + s;
        n = Math.floor(n / len) - 1;
      }
      return s;
    },
  },
};
</script>
<style lang='less'>
.autoSpace () {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bBottom() {
  border-bottom: 1px solid #e3e3e3;
}
.columList {
  box-sizing: border-box;
  padding: 0 15px;
  > li {
    .autoSpace();
    padding: 10px 0;
    > div {
      width: calc(80% - 35px);
    }
    > .numberList {
      .autoSpace();
      > span {
        width: 24px;
        height: 24px;
        border: 1px solid #e3e3e3;
        color: #e3e3e3;
        text-align: center;
        line-height: 24px;
        font-size: 12px;
      }
      > .active {
        border-color: #40a9ff;
      }
    }
    > .tag {
      > .tagList {
        margin-right: 10px;
        height: 25px;
        line-height: 25px;
        i {
          color: red;
        }
      }
    }
    &:nth-child(1) {
      .bBottom();
    }
    &:nth-last-child(1) {
      align-items: flex-start;
    }
  }
}
.main {
  max-height: 300px;
  overflow-y: auto;
  position: relative;
  > .mask {
    position: absolute;
    width: 100%;
    height: calc(100% - 80px);
    bottom: 0;
    z-index: 100;
  }
  > ul {
    margin-bottom: 20px;
    > li {
      padding: 17px 0;
      .bBottom();
      &:nth-last-child(1) {
        border: none;
      }
      > div {
        width: 330px;
      }
      .autoSpace();
      align-items: flex-start;
    }
  }
  > .fixation {
    width: 100%;
    .bBottom();
    padding: 15px 0;
    > div {
      position: relative;
      .rightButton {
        position: absolute;
        right: 0;
        top: 0;
        padding-right: 0 !important;
        > i {
          color: #3090f8;
          font-size: 12px;
        }
      }
      .autoSpace();
      margin-bottom: 8px;
      &:nth-last-child(1) {
        margin-bottom: 0;
      }
      > .item {
        width: 330px;
        display: flex;
        align-items: center;
        > .right {
          width: 240px;
        }
        .autoChild {
          .autoSpace();
          > button {
            width: 48%;
          }
        }
        > span {
          flex: 1;
          box-sizing: border-box;
          padding-right: 6px;
          text-align: right;
        }
      }
    }
  }
  .ageInfo {
    .autoSpace();
    align-items: flex-start;
    > span {
      flex: 1;
      text-align: right;
      padding-right: 6px;
      padding-top: 5px;
    }

    > div {
      width: 240px;
      > .top {
        margin-bottom: 10px;
        .autoSpace();
        > .han {
          .autoSpace();
        }
        .hanborder {
          border: 1px solid #e3e3e3;
        }
      }
    }
  }
  .comdateInfo {
    .autoSpace();
    align-items: flex-start;
    > div {
      width: 240px;
      > div {
        margin-bottom: 10px;
        &:nth-last-child(1) {
          margin-bottom: 0;
        }

        .autoSpace();
        > div,
        button {
          flex: 1;
        }
      }
      > span {
        flex: 1;
      }
    }
    > span {
      flex: 1;
      text-align: right;
      padding-right: 6px;
    }
  }
  .expByType {
    > div {
      margin-bottom: 10px;
      &:nth-last-child(1) {
        margin-bottom: 0;
      }
      > div {
        margin-bottom: 10px;
        &:nth-last-child(1) {
          margin-bottom: 0;
        }
      }
    }
    > .title {
      .autoSpace();
      > span {
        flex: 1;
        text-align: right;
        padding-right: 6px;
      }
      > div {
        .autoSpace();
        width: 240px;
        > button {
          flex: 1;
        }
      }
    }
    > .sum {
      > .addList {
        position: relative;
        > i {
          position: absolute;
          top: 5px;
          right: -53px;
          color: #3090f8;
          font-size: 12px;
        }
      }
      > div {
        .autoSpace();
        .callNumber {
          position: relative;
          > i {
            position: absolute;
            top: 5px;
            right: -53px;
            color: #3090f8;
            font-size: 12px;
          }
          .pInput {
            > input {
              padding: 0;
            }
          }
          > div {
            .autoSpace();
            justify-content: flex-start;
            > div {
              &:nth-child(1) {
                width: 50%;
                margin-right: 10px;
              }
              &:nth-last-child(1) {
                border-radius: 20px;
                background: #e3e3e3;
                width: 80px;
                .autoSpace();
                > span {
                  flex: 1;
                  text-align: center;
                  color: white;
                }
                > .active {
                  background: #73a4ff;
                  border-radius: 20px;
                  line-height: 20px;
                }
              }
            }
          }
        }
        .callNumber {
          .span {
            width: 60px;
            margin: 0 10px;
          }
          > div {
            width: calc(50% - 50px);
            flex: auto;
          }
        }
        > span {
          flex: 1;
          text-align: right;
          padding-right: 6px;
        }
        > div {
          width: 240px;
          .autoSpace();
          > button,
          > div {
            flex: 1;
          }
        }
      }
    }
    > .count {
      > div {
        .autoSpace();
        > span {
          flex: 1;
          text-align: right;
          padding-right: 6px;
        }
        > div {
          width: 240px;
        }
      }
    }
  }
  .joindate {
    .autoSpace();
    > span {
      flex: 1;
      text-align: right;
      padding-right: 6px;
    }
    > div {
      width: 240px;
      .autoSpace();
    }
  }
  .jobCodeInfo {
    .autoSpace();
    align-items: flex-start;
    > span {
      flex: 1;
      text-align: right;
      padding-right: 6px;
    }
    > div {
      width: 240px;
      > div {
        margin-bottom: 10px;
        &:nth-last-child(1) {
          margin-bottom: 0;
        }
      }
    }
  }
  .selectInfo,
  .radioInfo {
    .autoSpace();
    > div {
      width: 240px;
      .autoSpace();
      > button {
        flex: 1;
      }
    }
    > span {
      flex: 1;
      text-align: right;
      padding-right: 6px;
    }
  }
}
.footerBar {
  text-align: center;
  display: flex;
  justify-content: space-evenly;
}
.draggableMain {
  height: 100%;
  white-space: nowrap;
  width: 100%;
  overflow-x: auto;
  > div {
    display: inline-block;
    white-space: initial;
    background: #f2f8ff;
    border-right: 1px solid #fff;
    min-width: 219px;
    box-sizing: border-box;
    padding: 8px 10px;
    position: relative;
    text-align: center;
    &:nth-last-child(1) {
      border: none;
    }
    > div {
      > span {
        color: #3090f8;
      }
      > .action {
        display: inline-block;
        margin-left: 12px;
        > span {
          margin-right: 6px;
          &:nth-child(3) {
            margin: 0;
          }
        }
      }
    }
    > ul {
      text-align: left;
      position: absolute;
      top: 100%;
      left: 0;
      font-size: 14px;
      width: 100%;
      font-size: 12px;
      > li {
        &:nth-child(2n + 2) {
          background: #fafafa;
        }
        &:nth-last-child(1) {
          margin: 0;
        }
        > div {
          > div {
            .autoSpace();
            justify-content: flex-start;
            align-items: flex-start;
            padding: 5px 0;
            > span {
              width: 70px;
              box-sizing: border-box;
              padding-right: 6px;
              text-align: right;
            }
            > p {
              text-align: left;
              flex: 1;
              color: #5eaaff;
            }
          }
        }
        // > .jobcode {
        //   background: red;
        //   > div {
        //     align-items: flex-start;
        //   }
        // }
      }
    }
  }
  > .active {
    background: #e2e8ee;
    white-space: initial;
  }
}
</style>