import React from 'react';
import { Table } from 'antd';
import { withRouter } from 'react-router';
import { Form, Input, Radio, Button, Divider, Typography } from 'antd';
import { firebaseApp } from './config/firebase'
import { returnColumns, returnDataSource } from "./DataConvert";

const firebaseDb = firebaseApp.database();
const { Title, Paragraph, Text } = Typography;

class Event extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            participant: {
                name: '',
                candidates: []
            },
            eventDetail: {
                eventId: this.props.match.params.id,
                eventName: '',
                description: '',
                dataSource: [],
                columns: []
            }
        }
    }

    componentDidMount() {
        this.watchEventDetail();
    }

    watchEventDetail = () => {
        const eventRef = firebaseDb.ref(`events/${this.props.match.params.id}`);
        eventRef.on("value", snapshot => {
            const { eventDetail, participant } = this.state;
            const event = snapshot.val();
            const { eventName, description, candidateDates } = event;
            const columns = returnColumns(event);
            const dataSource = event.participants ? returnDataSource(event) : null
            const candidates = Object.entries(candidateDates)
                                .map(candidateDate => ({
                                    id:candidateDate[0],
                                    dateTime:candidateDate[1],
                                    answer:'△'
                                }));
            this.setState({
                eventDetail:{...eventDetail, eventName, description, dataSource, columns },
                participant:{...participant, candidates}
            });
        });
    }




    onChangeCandidate = (id, value) => {
        const participant = this.state.participant;
        const newCandidates = participant.candidates.map(candidate => {
            return (candidate.id === id) ?
                { ...candidate, answer: value } :
                candidate;
        });
        this.setState({
            participant: {
                ...participant,
                candidates: newCandidates
            }
        });
    };


    onChangeName = (evt) => {
        const participant = this.state.participant;
        this.setState({
            participant: {
                ...participant,
                name: evt.target.value
            }
        });
    }

    initializeParticipant = () => {
        this.setState({
            participant: {
                ...this.state.participant,
                name: ''
            }
        });
    }


    onSubmit = (evt) => {
        evt.preventDefault();
        const { participant } = this.state;
        const name = participant.name;
        const votes = Object.values(participant.candidates)
            .map(candidate => ({ [candidate.id]: candidate.answer }))
            .reduce((acc, cur) => Object.assign(acc, cur), {});
        const participantRef = firebaseDb.ref(`events/${this.props.match.params.id}/participants`);
        participantRef.push({ name, votes })
            .then(this.initializeParticipant);
    };

    render() {
        const eventDetail = this.state.eventDetail;
        const participant = this.state.participant;
        return (
            <div>
                <Title level={2}>{eventDetail.eventName}</Title>

                <Paragraph>{eventDetail.description}</Paragraph>

                <Table dataSource={eventDetail.dataSource} columns={eventDetail.columns} pagination={false} />

                <Divider />

                <div>
                    <Title level={3}>出欠を入力する</Title>
                    <Form onSubmit={this.onSubmit}>
                        <Form.Item label='名前'>
                            <Input value={participant.name} placeholder='田中' onChange={this.onChangeName} />
                        </Form.Item>
                        <Form.Item label='候補日程'>
                            {participant.candidates.map(candidate => (
                                <div key={"candidate-" + candidate.id}>
                                    <Text>{candidate.dateTime}</Text>
                                    <Radio.Group
                                        value={candidate.answer}
                                        buttonStyle="solid"
                                        onChange={(evt) => this.onChangeCandidate(candidate.id, evt.target.value)}>
                                        <Radio.Button value="〇">〇</Radio.Button>
                                        <Radio.Button value="△">△</Radio.Button>
                                        <Radio.Button value="×">×</Radio.Button>
                                    </Radio.Group>
                                    <br />
                                </div>
                            ))}
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">登録する</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default withRouter(Event);
