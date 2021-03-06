# WalletController #
# mycards() #
## 我的银行卡接口


### 接口地址


```
.../mybankcards
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../mybankcards
```

###### Json数据格式
```
data
user_id             user_id        

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    bankcardno     //银行卡号
                    bankname       //银行名字
                    cardtype       //卡类型
                    banklogo       //银行logo
                    bankkey        //银行代号 
             }
msg          ""
)
```

```
失败
callback(
code          111
data          ""
msg           失败
)
```

###### Code值含义

```
000           成功
131           未添加银行卡

```
# apply() #
## 申请提现接口


### 接口地址


```
.../withdraw/apply
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../withdraw/apply
```

###### Json数据格式
```
data
user_id             user_id    
money               money
bankcardno          bankcardno
bankname            bankname
cardtype            cardtype

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
msg          ""
)
```

```
失败
callback(
code          111
data          ""
msg           ""
)
```

###### Code值含义

```
000          申请提现成功，银行处理中
111          申请提现失败，该银行卡未绑定
131          申请提现失败，余额不足
132          申请提现失败，有提现尚未处理
```
# bill() #
## 账单明细接口


### 接口地址


```
.../mywallet/bill
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../mywallet/bill
```

###### Json数据格式
```
data
必选参数
user_id             user_id    
可选参数
month               month       //按月筛选 格式201701
page                page        //默认第一页   
limit               limit       //每天显示数 默认20条

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                    id          id
                    money       money
                    content     content
                    time        time
                    img         img
                    total       total        //总数据数
             }

)
```

```
失败
callback(
code          111
data          ""
msg           失败
)
```

###### Code值含义

```
117          信息不存在
```
# del() #
## 单条账单明细删除接口


### 接口地址


```
.../mywallet/bill/del
```

### 接口格式

### 调用

```
接收方式        GET
```

```
.../mywallet/bill/del
```

###### Json数据格式
```
data
id                  id    

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         ""
msg          成功

)
```

```
失败
callback(
code          111
data          ""
msg           失败
)
```

###### Code值含义

```
```

# index() #
## 获取当前总额、提现金额、保证金接口


### 接口地址


```
.../mywallet
```

### 接口格式

### 调用

```
接收方式        GET POST
```

```
.../mywallet
```

###### Json数据格式
```
data
user_id             user_id    

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                available_total          提现金额
                total                    当前总额
                deposit                  保证金
                process_type             存不存在提现申请 true:可提现 flase:有提现未确认
            }

)
```

```
失败
callback(
code          117
data          ""
msg           "没有金额"
)
```

###### Code值含义

```
```
# materialer() #
##材料商获取我的资产，今日收益接口


### 接口地址


```
.../mywallet/materialer
```

### 接口格式

### 调用

```
接收方式        GET POST
```

###### Json数据格式
```
data
user_id             user_id 

callback            callback
```

### 回调
###### Json数据格式

```
成功
callback(
code         000
data         {
                total              我的资产
                todaytotal         今日收益
                available_total    可提现金额
                process_type       存不存在提现申请 true:可提现 flase:有提现未确认
            }

)
```

```
失败
callback(
code          111
data          ""
msg           ""
)
```

###### Code值含义

```
```