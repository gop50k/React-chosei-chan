import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Button, Typography } from 'antd';
import { firebaseApp } from './config/firebase'

const firebaseDb = firebaseApp.database();

const { Title } = Typography;

class EventEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: '',
            description: '',
            candidateText: ''
        };
    }

    registerEvent = async (evt) => {
        // 入力した値をRealtime Databaseに書き込もう
        // イベントIDを取得して画面遷移しよう
        evt.preventDefault();
        const { eventName, description, candidateText } = this.state;
        const candidateDates = candidateText.split('\n');
        const eventRef = firebaseDb.ref("events");
        const eventId = await eventRef.push({ eventName, description, candidateDates }).key;
        this.props.history.push(`/event/${eventId}`);
    }

    onChangeEventName = (evt) => {
        // window.alert('onChangeEventNameが呼ばれた');
        this.setState({ eventName: evt.target.value });
    }

    onChangeDescription = (evt) => {
        this.setState({ description: evt.target.value });
    }

    onChangeCandidateText = (evt) => {
        this.setState({ candidateText: evt.target.value });
    }

    render() {
        // window.alert('render関数が呼ばれた');
        return (
            < div >
                <Title level={2}>イベント登録</Title>
                <Form onSubmit={this.registerEvent}>
                    <Form.Item label="イベント名">
                        <Input
                            value={this.state.eventName}
                            onChange={this.onChangeEventName}
                            placeholder='送別会' />
                    </Form.Item>
                    <Form.Item label="説明">
                        <Input.TextArea
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            placeholder='送別会の日程調整しましょう！出欠〆切は◯日。'></Input.TextArea>
                    </Form.Item>
                    <Form.Item label="候補日程" extra="※候補日程／日時を入力してください（候補の区切りは改行で判断されます）">
                        <Input.TextArea
                            value={this.state.candidateText}
                            onChange={this.onChangeCandidateText}
                            placeholder='8/7(月) 20:00～&#13;&#10;8/8(火) 20:00～&#13;&#10;8/9(水) 21:00～'></Input.TextArea>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">出欠表を作る</Button>
                    </Form.Item>
                </Form>
            </div >
        );
    }
}

export default withRouter(EventEntry);
