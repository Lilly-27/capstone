import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './Stories.css';


function Stories() {
  const [storyData, setStoryData] = useState();
  const [selected, setSelected] = useState(null)

  const handleButton = (e) => {
    e.preventDefault();
    // console.log(e.target.dataset.key)
    const selectedNumber= Number(e.target.dataset.key)
    setSelected(selectedNumber)
  }
  
  const fetchAll = () => {
    const storyURL = `${process.env.REACT_APP_API_ENDPOINT_PROD}stories/getall`
    fetch(storyURL)
    .then((res) => res.json())
    .then((data)=>{
      console.log(data)
      return setStoryData(data)
    })
    .catch(console.error)
  }

  useEffect(() => {
    fetchAll()
  }, [])

  return (
    <div id="Stories">
      <h2>Our Stories Matter</h2>
      <p>Sharing our stories helps us build a sense of community with each other, of acceptance and unity. <br />
        Our hope is for you to read these stories and feel comforted by the fact that you are not alone.</p>
      <Row xs={1} md={3} xl={8} id="container">
      {storyData
      ? storyData.map((story, index) => {
          return(
            <Col id="columns">
              <Card id="card" key={index}>
                <Card.Body>
                  <Card.Title>{story.title}</Card.Title>
                  {selected === index
                    ? <Card.Text> {story.body}</Card.Text>
                    :<Card.Text>{story.body.slice(0,500)}</Card.Text>
                  }
                </Card.Body>
                  <button onClick={handleButton} data-key={index}>Read More</button>
              </Card>
            </Col>
          )
      })
      :<p>Loading...</p>
      }
      </Row>
   
     </div>
  )
}

export default Stories