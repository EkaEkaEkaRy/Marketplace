

import { Component } from 'react'
import h from './history.module.css'
const entrance = [
    {
        date: "01.02.2001",
        qwesion: 'мысли',
        answer: ["Сегодня меня били дома, в школе, на доп занятиях и по дороге домой! Люблю жизнь"]
    },
    {
        date: "01.02.2001",
        qwesion: "вопрос",
        answer: ["Какая самая полезная вещь находится у тебя в комнате?", "Гранатомет. В нужный момент никогда не подводил"]
    },
    {
        date: "15.01.2001",
        qwesion: 'настроение',
        answer: ["Тревожность", "Апатия"]
    },
    {
        date: "16.01.2001",
        qwesion: 'настроение',
        answer: ["радость"]
    },
]

let entrances;

class History extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            shouldshowElem: false,
        };
    }
    handleClick() {
        this.setState({
            shouldshowElem: true,
        })
        entrances = JSON.parse(localStorage.getItem('userInfoId'))
        
    }
    render() {
        const Main = () => {
            return (
                <main>
                    {
                        entrances.map(en => {
                            return (
                                <div key={en.id} className={h.item}>
                                    <div className={h.date}>{en.date}</div>
                                    <div className={h.cat}>{en.qwesion}</div>
                                    <div>{en.answer}</div>
                                </div>
                            )
                        })
                    }
                </main>
            )
        }
        return (
            <div className={h.history_wrapper}>
                <header className={h.header}>
                    <input className={h.button} type="button" value="История записей" onClick={() => { this.handleClick() }} />
                </header>
                <div>
                    {this.state.shouldshowElem && <Main />}
                </div>
            </div>
        )
    }
}

export default History