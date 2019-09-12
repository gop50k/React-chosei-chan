import React from 'react';
import { Link } from "react-router-dom";
import { Button, Typography, Input } from 'antd';
import { firebaseApp } from './config/firebase'

const firebaseDb = firebaseApp.database();
const { Title, Paragraph } = Typography;


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            output: ''
        };
    }


    onClick = async (evt) => {
        const { input } = this.state;
        const testKey = await firebaseDb.ref('test').push(input).key
        firebaseDb.ref(`test/${testKey}`).on("value", snapshot => {
            const txt = snapshot.val();
            this.setState({
                output: txt
            });
        })
    }

    render() {
        const { input, output } = this.state;
        return (
            <div>
                <Title level={1}>こんにちは!</Title>
                <Paragraph>
                    このページが表示されているということは"npm start"に成功していますね。
                </Paragraph>
                <Paragraph>
                    次はデータベースとの接続を確認してみましょう。<br/>
                    以下のフォームに何かを入力してから送信ボタンを押してください。
                </Paragraph>


                <Input placeholder="何か入力してみましょう" value={input} onChange={e => this.setState({ input:e.target.value })} />
                <Button type="primary" htmlType="submit" onClick={this.onClick}>送信する</Button>
                <br />
                <Title level={4}>{output}</Title>
                <Paragraph>
                    入力した値が表示されれば接続成功です。<br />
                    以下のリンクからイベント登録画面に進んでください。
                </Paragraph>
                <hr />
                <Link to="/event">イベント登録</Link>
            </div>
        );
    }

}

export default Home;