// 1、针对当月签约的新人，达标绩优就达标了CE。
// 2、非当月签约人员，达标绩优且出勤大于等于12天，即为CE人力。在当月1-20日（含）进行按日追踪时，达标绩优，即为CE人力。
/**
 * 悲伤向右:
startNodes 中是表格的内容

每个node是一个单元格
node的type区分判断节点和赋值节点
node的condition 里是配置的具体条件
condition中的code 是配置条件弹窗 下来框里选择的 并且 或者
condition中data是具体的表达式 每个expression是一行表达式
expression 是割数组，直接按顺序往下拼接的，除了函数会涉及到嵌套

 */
export default {
  "quotaId": 1,
  "quotaCode": "isCE_00001",
  "quotaName": "是否CE人力",
  "quotaType": 1,
  "lawEdition": "02A,02B,02C",
  "parentCodes": "isJY_0001",
  "quotaDimension": "emp",
  "eachDimension": "emp",
  "hisColumnQuery": "", // 假设需要上月fyc "{column:'fyc', 'time': 'last_1_month'}"
  "startNodes": [
    {
      "id": 1,
      "type": "judge",
      "code": "judgeNode_00001",
      "fieldType": 0, //0-基础指标 1-上级指标
      "field": "emp.status",
      "dataTime": null, //数据时间, 所有行都相同则显示在前
      "condition": {//在职
        "type": "logic",
        "code": "and",
        "data": [
          {
            "expression": [
              {
                "type": "op",
                "code": "eq",
                "name": "等于"
              },
              {
                "type": "input",
                "code": "UQ1"
              }
            ]
          }
        ]
      },
      "childNodes": [
        {
          "id": 2,
          "type": "judge",
          "code": "judgeNode_00002",
          "fieldType": 0, //0-基础指标 1-上级指标
          "field": "emp.joindate",
          "dataTime": null, //数据时间, 所有行都相同则显示在前
          "condition": {
            "type": "logic",
            "code": "and",
            "data": [
              {
                "expression": [//本月入职
                  {
                    "type": "op",
                    "code": "ge",
                    "name": "大于等于"
                  },
                  {
                    "type": "function",
                    "code": "get_month_first_day",
                    "name": "取月第一天",
                    "args": [
                      {
                        "type": "const",
                        "code": "comdate",
                        "name": "结算日期"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          "childNodes": [
            {
              "id": 4,
              "type": "judge",
              "code": "judgeNode_00004",
              "fieldType": 1, //0-基础指标 1-上级指标
              "field": "emp.isJY",
              "dataTime": null, //数据时间, 所有行都相同则显示在前
              "condition": {//绩优
                "type": "logic",
                "code": "and",
                "data": [
                  {
                    "expression": [
                      {
                        "type": "op",
                        "code": "eq",
                        "name": "等于"
                      },
                      {
                        "type": "const",
                        "code": "yes",
                        "name": "是"
                      }
                    ]
                  }
                ]
              },
              "childNodes": [
                {
                  "id": 6,
                  "type": "judge",
                  "code": "judgeNode_00006",
                  "fieldType": 0, //0-基础指标 1-上级指标
                  "field": "const.comdate_month_day",
                  "dataTime": null, //数据时间, 所有行都相同则显示在前
                  "condition": {
                    "type": "logic",
                    "code": "and",
                    "data": [//出勤天数 无
                      {
                        "expression": [
                          {
                            "type": "empty",
                            "code": null,
                            "name": "无"
                          }
                        ]
                      }
                    ]
                  },
                  "childNodes": [
                    {//结算日期 无
                      "id": 9,
                      "type": "judge",
                      "code": "judgeNode_00009",
                      "fieldType": 0, //0-基础指标 1-上级指标
                      "field": "emp.workdays",
                      "dataTime": null, //数据时间, 所有行都相同则显示在前
                      "condition": {
                        "type": "logic",
                        "code": "and",
                        "data": [
                          {
                            "expression": [
                              {
                                "type": "empty",
                                "code": null,
                                "name": "无"
                              }
                            ]
                          }
                        ]
                      },
                      "childNodes": [
                        {
                          "id": 12,
                          "type": "assign",
                          "code": "assignNode_00012",
                          "fieldType": 1, //0-基础指标 1-上级指标
                          "field": "emp.isCe",
                          "condition": {
                            "type": "logic",
                            "code": "and",
                            "data": [
                              {
                                "expression": [
                                  {
                                    "type": "const",
                                    "code": "yes",
                                    "name": "是"
                                  }
                                ]
                              }
                            ]
                          },
                          "childNodes": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": 3,
          "type": "judge",
          "code": "judgeNode_00003",
          "fieldType": 0, //0-基础指标 1-上级指标
          "field": "emp.joinDate",
          "dataTime": null,
          "condition": {
            "type": "logic",
            "code": "and",
            "data": [
              {
                "expression": [
                  {
                    "type": "op",
                    "code": "lt",
                    "name": "小于"
                  },
                  {
                    "type": "function",
                    "code": "get_month_first_day",
                    "name": "取月第一天",
                    "args": [
                      {
                        "type": "const",
                        "code": "comdate",
                        "name": "结算日期"
                      }
                    ]
                  }
                ]
              }
            ]
          },
          "childNodes": [
            {
              "id": 5,
              "type": "judge",
              "code": "judgeNode_00005",
              "fieldType": 1, //0-基础指标 1-上级指标
              "field": "emp.isJY",
              "dataTime": null,
              "condition": {
                "type": "logic",
                "code": "and",
                "data": [
                  {
                    "expression": [
                      {
                        "type": "op",
                        "code": "eq",
                        "name": "等于"
                      },
                      {
                        "type": "const",
                        "code": "yes",
                        "name": "是"
                      }
                    ]
                  }
                ]
              },
              "childNodes": [
                {
                  "id": 7,
                  "type": "judge",
                  "code": "judgeNode_00007",
                  "fieldType": 0, //0-基础指标 1-上级指标
                  "field": "const.comdate_month_day",
                  "dataTime": null,
                  "condition": {
                    "type": "logic",
                    "code": "and",
                    "data": [
                      {
                        "expression": [
                          {
                            "type": "op",
                            "code": "ge",
                            "name": "大于等于"
                          },
                          {
                            "type": "input",
                            "code": "20"
                          }
                        ]
                      }
                    ]
                  },
                  "childNodes": [
                    {
                      "id": 10,
                      "type": "judge",
                      "code": "judgeNode_00010",
                      "fieldType": 0,
                      "field": "emp.workdays",
                      "dataTime": null,
                      "condition": {
                        "type": "logic",
                        "code": "and",
                        "data": [
                          {
                            "expression": [
                              {
                                "type": "op",
                                "code": "ge",
                                "name": "大于等于"
                              },
                              {
                                "type": "input",
                                "code": "12"
                              }
                            ]
                          }
                        ]
                      },
                      "childNodes": [
                        {
                          "id": 13,
                          "type": "assign",
                          "code": "assignNode_00013",
                          "fieldType": 1, //0-基础指标 1-上级指标
                          "field": "emp.isCe",
                          "condition": {
                            "type": "logic",
                            "code": "and",
                            "data": [
                              {
                                "expression": [
                                  {
                                    "type": "const",
                                    "code": "yes",
                                    "name": "是"
                                  }
                                ]
                              }
                            ]
                          },
                          "childNodes": []
                        }
                      ]
                    }
                  ]
                },
                {
                  "id": 8,
                  "type": "judge",
                  "code": "judgeNode_00008",
                  "fieldType": 0, //0-基础指标 1-上级指标
                  "field": "const.comdate_month_day",
                  "dataTime": null,
                  "condition": {
                    "type": "logic",
                    "code": "and",
                    "data": [
                      {
                        "expression": [
                          {
                            "type": "op",
                            "code": "lt",
                            "name": "小于"
                          },
                          {
                            "type": "input",
                            "code": "20"
                          }
                        ]
                      }
                    ]
                  },
                  "childNodes": [
                    {
                      "id": 11,
                      "type": "judge",
                      "code": "judgeNode_00011",
                      "fieldType": 0,
                      "field": "emp.workdays",
                      "dataTime": null,
                      "condition": {
                        "type": "logic",
                        "code": "and",
                        "data": [
                          {
                            "expression": [
                              {
                                "type": "empty",
                                "code": null,
                                "name": "无"
                              }
                            ]
                          }
                        ]
                      },
                      "childNodes": [
                        {
                          "id": 14,
                          "type": "assign",
                          "code": "assignNode_00014",
                          "fieldType": 1, //0-基础指标 1-上级指标
                          "field": "emp.isCe",
                          "condition": {
                            "type": "logic",
                            "code": "and",
                            "data": [
                              {
                                "expression": [
                                  {
                                    "type": "const",
                                    "code": "yes",
                                    "name": "是"
                                  }
                                ]
                              }
                            ]
                          },
                          "childNodes": []
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  "otherNode": {
    "id": 15,
    "type": "assign",
    "code": "assignNode_00015",
    "fieldType": 1, //0-基础指标 1-上级指标
    "field": "emp.isCe",
    "condition": {
      "type": "logic",
      "code": "and",
      "data": [
        {
          "expression": [
            {
              "type": "const",
              "code": "no",
              "name": "否"
            }
          ]
        }
      ]
    },
    "childNodes": []
  }
}