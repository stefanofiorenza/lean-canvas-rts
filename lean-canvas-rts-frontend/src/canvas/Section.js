import React from "react";
import { Card, Dropdown, Button, Row, Col } from "react-bootstrap";
import Topic from "./Topic";
import { saveTopic, removeTopic } from "../api/api";
import io from "socket.io-client";

const styles = {
  sectionContent: {}
};

export default ({
  canvasId,
  name,
  color,
  extended,
  loadedTopics,
  show = true
}) => {
  const [topics, setTopics] = React.useState(loadedTopics);
  const [textTopic, setTextTopic] = React.useState();

  React.useEffect(() => {
    setTopics(loadedTopics);
  }, [loadedTopics]);

  React.useEffect(() => {
    const socket = io("http://localhost:4000", {
      query: { canvasId: canvasId }
    });

    socket.on("insert", topic => {
      if (topic && topic.section === name) setTopics([...topics, topic]);
    });

    socket.on("remove", topic => {
      if (topic && topic.section === name)
        setTopics([...topics.filter(t => t.id !== topic.id)]);
    });
  }, [canvasId, topics, setTopics, name]);

  if (!show) return <React.Fragment />;

  function addTopic() {
    let topic = {
      kind: "new"
    };
    setTextTopic(topic);
  }

  async function saveTextTopic(topic, content) {
    topic.canvasId = canvasId;
    topic.content = content;
    topic.section = name;

    await saveTopic(canvasId, topic);
    // setTopics([...topics, topic]);
    setTextTopic(null);
  }

  async function removeTextTopic(topic) {
    await removeTopic(canvasId, topic.id);
  }

  function cancelTextTopic() {
    setTextTopic(null);
  }
  if (!topics) {
    return <></>;
  }
  const cardTopics = topics.map((t, k) => (
    <Topic
      key={k}
      color={color}
      topic={t}
      save={saveTextTopic}
      cancel={cancelTextTopic}
      onRemove={removeTextTopic}
    />
  ));

  return (
    <Card style={styles.sectionContent} className="w-100 flex-fill">
      <Card.Body className="p-2">
        <Card.Title>
          <div className="d-flex justify-content-between">
            {name}
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic" />
              <Dropdown.Menu>
                <Dropdown.Item onClick={addTopic}>New Topic</Dropdown.Item>
                <Dropdown.Item>Hide</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Card.Title>
        <div className="d-flex flex-column justify-content-between">
          <div className="d-flex flex-column ">
            {extended ? (
              <Row>
                {topics.map((t, k) => (
                  <Col xs={6}>
                    <Topic
                      key={k}
                      color={color}
                      topic={t}
                      save={saveTextTopic}
                      cancel={cancelTextTopic}
                      onRemove={removeTextTopic}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              cardTopics
            )}

            {textTopic && (
              <Topic
                key={999}
                color={color}
                topic={textTopic}
                save={saveTextTopic}
                cancel={cancelTextTopic}
                onRemove={removeTextTopic}
              />
            )}
          </div>
          <Button variant="secondary" onClick={addTopic}>
            New Topic
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};