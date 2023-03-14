import React from "react";
import Background from './background2.jpg';
import {useState, useEffect} from "react";
import { Card, CarouselItem } from "react-bootstrap"
import { Carousel } from "react-bootstrap"
import axios from "axios";

function Landing() {

    const [apiData, setApiData] = useState([]);
    const [animalName, setAnimalName] = useState("");
    const [animalLocation, setAnimalLocation] = useState("");
    const [animalLocation2, setAnimalLocation2] = useState("");
    const [animalLocation3, setAnimalLocation3] = useState("");
    const [animalSkinType, setAnimalSkinType] = useState("");
    const [animalPrey, setAnimalPrey] = useState("");

    useEffect(()=>{
        axios({
            type: "GET",
            url: "https://api.api-ninjas.com/v1/animals?name=tiger",
            headers: { 'X-Api-Key': 'p31mA3zAJl7xjNaNX7Zdaw==Ms3ncGa9PnAHgpIi'},
            contentType: 'application/json',
        })
        .then((response) => {
            console.log(response);
            const index = 3;
            setApiData(response.data)
            setAnimalName(response.data[index].name);
            setAnimalLocation(response.data[index].locations[0]);
            setAnimalLocation2(response.data[index].locations[1]);
            setAnimalLocation3(response.data[index].locations[2]);
            setAnimalSkinType(response.data[index].characteristics.skin_type);
            setAnimalPrey(response.data[index].characteristics.main_prey);
        })
    }, [])

    return (
        <div className="App">
            <div style={{ margin: '0px' }}>
                <img src={Background} alt="tiger" style={{ width: '1423px', height: '710px'}}/>
            </div>
            <Card style={{marginTop: '-45%', marginLeft: '35%' ,padding: '1%', width: '35%', backgroundColor: '#577D92'}}>
                <Card.Body>
                    <Card.Title style={{fontSize: '19pt',}}>About API</Card.Title>
                    <Card.Text>
                        The Animals API provides interesting scientific facts on thousands of different animal 
                        species that one will find in the world. These different scientific facts of animals will 
                        be used to compare animals as to see how they differ from each other or where they are similar. 
                    </Card.Text>
                </Card.Body>
            </Card>
            
            <Carousel style={{width: '300px', marginTop: '-15.4%', marginLeft: '74%'}}>
                <CarouselItem>
                    <Card style={{width: '93%', marginLeft: '3.5%', backgroundColor: '#577D92'}}>
                    <Card.Body style={{paddingTop: '2px', paddingBottom: '0px'}}>
                        <Card.Title>{animalName}</Card.Title>
                    </Card.Body>
                        <img src="https://cdn.wallpapersafari.com/48/2/yNvH97.jpg" style={{height: '184px'}} className="card-img-top" alt="Sunset Over the Sea"/>
                    </Card>
                </CarouselItem>
                <CarouselItem>
                    <Card style={{width: '93%', marginLeft: '3.5%', backgroundColor: '#577D92', height: '220px'}}>
                        <Card.Body style={{padding: '3.4%'}}>
                            <Card.Title>Location</Card.Title>
                            <br />
                            <br />
                            <Card.Text>
                                {animalLocation} <br />
                                {animalLocation2} <br />
                                {animalLocation3}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </CarouselItem>
                <CarouselItem>
                    <Card style={{width: '93%', marginLeft: '3.5%', backgroundColor: '#577D92', height: '220px'}}>
                        <Card.Body style={{padding: '3.4%'}}>
                            <Card.Title>Prey</Card.Title>
                            <Card.Text>
                                {animalPrey}
                            </Card.Text>
                        </Card.Body>
                        <img src="https://vetmed.tamu.edu/news/wp-content/uploads/sites/9/2022/05/bison1-AdobeStock_187916675.jpeg" style={{height: '150px'}} className="card-img-top" alt="Sunset Over the Sea"/>
                    </Card>
                </CarouselItem>
                <CarouselItem>
                    <Card style={{width: '93%', marginLeft: '3.5%', backgroundColor: '#577D92', height: '220px'}}>
                        <Card.Body style={{paddingTop: '2px', paddingBottom: '0px'}}>
                            <Card.Title>Habitat</Card.Title>
                        </Card.Body>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Nachusa_Grasslands_Spring_2016.jpg" className="card-img-top" alt="Sunset Over the Sea"/>
                    </Card>
                </CarouselItem>
                <CarouselItem>
                    <Card style={{width: '93%', marginLeft: '3.5%', backgroundColor: '#577D92', height: '220px'}}>
                        <Card.Body style={{paddingTop: '2px', paddingBottom: '0px'}}>
                            <Card.Title>Favourite Food</Card.Title>
                        </Card.Body>
                        <img src="https://www.lls.nsw.gov.au/__data/assets/image/0003/1378830/Deer.jpeg" style={{height: '190px'}} className="card-img-top" alt="Sunset Over the Sea"/>
                    </Card>
                </CarouselItem>
                <CarouselItem>
                    <Card style={{width: '93%', marginLeft: '3.5%', backgroundColor: '#577D92', height: '220px'}}>
                        <Card.Body style={{paddingTop: '2px', paddingBottom: '0px'}}>
                            <Card.Title>Skin Type</Card.Title>
                            <Card.Text>
                                {animalSkinType}
                            </Card.Text>
                        </Card.Body>
                        <img src="https://t4.ftcdn.net/jpg/05/62/72/67/360_F_562726733_OvBm40YaYBIYUiMtaDsL4ip6vVbcszi0.jpg" style={{height: '150px'}} className="card-img-top" alt="Sunset Over the Sea"/>
                    </Card>
                </CarouselItem>     
            </Carousel>

            <Card style={{width: '60%', marginLeft: '35%', marginTop: '20px', backgroundColor: '#577D92'}}>
                <Card.Body style={{padding: '4%'}}>
                    <Card.Title>Dataset Outline</Card.Title>
                    <Card.Text>
                        The chosen dataset can be used to either get information of a certain animal
                        or it can be used to compare diffrent animals with eacother (like <i>"Saber Tooth tiger vs Malayan Tiger" </i> 
                        or <i>"Cheetah vs Lion"</i>). The data that will be given can be used to get spesific information
                        like the Name of the animal, the taxomy, the location where they live and spesific charecteristics
                        of the animal chosen form the dataset. <br />
                        <br />
                        Some attributes of the animal that can easily be compared with eachother
                        are taxomy (<i>The order on food chain</i>), location where they live and characteristics like (<i>Prey, Estamated Population 
                        Size, Habitat, Gestation Period, Average Litter Size, Number of Species, Skin Type, Top Speed, Lifespan, Weight, Height and 
                        Age of Weaning</i>).
                    </Card.Text>
                </Card.Body>
            </Card>      
        </div>

    )
}

export default Landing;