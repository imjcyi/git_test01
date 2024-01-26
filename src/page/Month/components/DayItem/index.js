import classNames from 'classnames'
import './index.scss'
import { useMemo } from 'react'

const DayItem = ({ date, billList }) => {
    const dayResult = useMemo(() => {
        const pay = billList.filter((item) => item.type === 'pay').reduce((pre, item) => pre + item.money, 0)
        const inCome = billList.filter((item) => item.type === 'income').reduce((pre, item) => pre + item.money, 0)
        return {
            pay,
            inCome,
            total: pay + inCome
        }
    }, [billList])
    return (
        <div className={classNames('dailyBill')}>
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{date}</span>
                    <span className={classNames('arrow')}></span>
                </div>
                <div className="oneLineOverview">
                    <div className="pay">
                        <span className="type">支出</span>
                        <span className="money">{dayResult.pay.toFixed(2)}</span>
                    </div>
                    <div className="income">
                        <span className="type">收入</span>
                        <span className="money">{dayResult.inCome.toFixed(2)}</span>
                    </div>
                    <div className="balance">
                        <span className="money">{dayResult.total.toFixed(2)}</span>
                        <span className="type">结余</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DayItem