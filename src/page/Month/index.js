import { NavBar, DatePicker } from 'antd-mobile'
import React, { useEffect, useMemo, useState } from 'react'
import './index.scss'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import DayItem from './components/DayItem'

const Month = () => {
    const billList = useSelector((state) => state.bill.billList)

    // 数据二次处理
    const monthGroup = useMemo(() => {
        return _.groupBy(billList, (item) => {
            return dayjs(item.date).format('YYYY年 | MM月')
        })
    }, [billList])

    // 日期选择
    const [dateVisble, setDateVisible] = useState(false)
    const [currentDate, setCurrentDate] = useState(() => {
        return dayjs(new Date()).format('YYYY年 | MM月')
    })

    const [currentMouteList, setCurrentMouteList] = useState([])

    const monthResult = useMemo(() => {
        const pay = currentMouteList.filter((item) => item.type === 'pay').reduce((pre, item) => pre + item.money, 0)
        const inCome = currentMouteList.filter((item) => item.type === 'income').reduce((pre, item) => pre + item.money, 0)
        return {
            pay,
            inCome,
            total: pay + inCome
        }
    }, [currentMouteList])

    useEffect(() => {
        const nowDate = dayjs().format('YYYY年 | MM月')
        if (monthGroup[nowDate]) {
            setCurrentMouteList(monthGroup[nowDate])
        }
    }, [monthGroup])

    const onDateChange = (date) => {
        const formatDate = dayjs(date).format('YYYY年 | MM月')
        setCurrentDate(formatDate)
        if (monthGroup[formatDate]) {
            setCurrentMouteList(monthGroup[formatDate])
        }
        setDateVisible(false)

    }

    const dayGroup = useMemo(() => {
        const groupDate = _.groupBy(currentMouteList, (item) => {
            return dayjs(item.date).format('MM月DD日')
        })
        const keys = Object.keys(groupDate)
        return {
            groupDate,
            keys
        }
    }, [currentMouteList])
    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={() => setDateVisible(true)}>
                        <span className="text">
                            {currentDate + ''}账单
                        </span>
                        <span className={classNames('arrow', dateVisble && ' expand')}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{monthResult.pay.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.inCome.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.total.toFixed(2)}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={dateVisble}
                        onCancel={() => setDateVisible(false)}
                        onConfirm={onDateChange}
                        max={new Date()}
                    />
                </div>
                {/* 单日列表统计 */}
                {dayGroup.keys.map((key) => {
                    return <DayItem key={key} date={key} billList={dayGroup.groupDate[key]} />
                })}
            </div>
        </div >
    )
}

export default Month