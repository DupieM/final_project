import React from "react";
import Background from './background2.jpg';
import {useState, useEffect} from "react";
import { Card, CarouselItem } from "react-bootstrap"
import { Carousel } from "react-bootstrap"
import { Pie } from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2'
import axios from "axios";

function Landing() {

    const [apiData, setApiData] = useState([]);
    const [animalName, setAnimalName] = useState("Loading..");
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

    const [tigerData, setCrocodileData] = useState([]);
    const [crocodileNames, setCrocodileNames] = useState([]);
    const [crocodileNumber_Species, setCrocodileNumber_Species] = useState([]);

    useEffect(()=>{
        axios({
            method: "GET",
            url: "https://api.api-ninjas.com/v1/animals?name=crocodile",
            headers: { 'X-Api-Key': 'p31mA3zAJl7xjNaNX7Zdaw==Ms3ncGa9PnAHgpIi'},
            contentType: 'application/json',
          })
          .then((response) => {
            // console.log(response.data)
            setCrocodileData(response.data)
      
            // Extract tiger names and average litter sizes from response data
            const getCrocodileNames = response.data.map((crocodile) => crocodile.name);
            const crocodileNumber_Species = response.data.map((crocodile) => crocodile.characteristics.number_of_species);
    
            
            // Update state variables
            setCrocodileNames(getCrocodileNames);
            setCrocodileNumber_Species(crocodileNumber_Species);
      
            console.log(getCrocodileNames);
            console.log(crocodileNumber_Species);
          })
    }, [])

    const chartData = {
        labels: crocodileNames,
        datasets: [
          {
            label: 'Number of Species',
            data: crocodileNumber_Species,
            borderColor: '#577D92',
            backgroundColor: [
                'rgba(107, 239, 255, 0.4)',
                'rgba(65, 215, 235, 0.4)',
                'rgba(93, 182, 201, 0.4)',
                'rgba(207, 219, 221, 0.4)',
              ],
          },
        ]
    }

    const [pandaData, setPandaData] = useState([]);
    const [pandaNames, setPandaNames] = useState([]);
    const [pandaLitterSize, setPandaLitterSize] = useState([]);

    useEffect(()=>{
        axios({
            method: "GET",
            url: "https://api.api-ninjas.com/v1/animals?name=panda",
            headers: { 'X-Api-Key': 'p31mA3zAJl7xjNaNX7Zdaw==Ms3ncGa9PnAHgpIi'},
            contentType: 'application/json',
          })
          .then((response) => {
            // console.log(response.data)
            setPandaData(response.data)
      
            // Extract tiger names and average litter sizes from response data
            const getPandaNames = response.data.map((panda) => panda.name);
            const pandaLitterSize = response.data.map((panda) => panda.characteristics.average_litter_size);
    
            
            // Update state variables
            setPandaNames(getPandaNames);
            setPandaLitterSize(pandaLitterSize);
      
            console.log(getPandaNames);
            console.log(pandaLitterSize);
          })
    }, [])

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: "right",
            labels: {
                color: 'black',
                boxWidth: 20,
                padding: 5
              }
          },
        }
      };

      const optionsBar = {
        responsive: true,
        animation: {
          animateRotate: false,
          animateScale: true,
        },
        plugins: {
          legend: {
            position: "top",
            labels: {
                color: 'black'
              }
          },
        },
        scales: {
            x: {
                ticks: {
                    color: 'black',
                },
                grid: {
                    color: 'rgba(104,104,104,0.7)',
                },
            },
            y: {
                ticks: {
                    color: 'black',
                },
                grid: {
                    color: 'rgba(104,104,104,0.7)',
                },
            }
          }
      };

    const chartHPData = {
        labels: pandaNames,
        datasets: [
          {
            label: 'Average Litter Size',
            data: pandaLitterSize,
            backgroundColor: 'rgba(107, 239, 255, 0.5)',
          },
        ]
    }

    return (
        <div className="App">
            <div style={{ margin: '0px' }}>
                <img src={Background} alt="tiger" style={{ width: '1423px', height: '710px'}}/>
            </div>

            <Card style={{marginTop: '-45%', marginLeft: '3%' ,padding: '0.7%', width: 400, height: 360, backgroundColor: '#577D92'}}>
                <Card.Title style={{fontSize: '19pt',}}>Crocodile Species</Card.Title>
                <div style={{width: 300, marginLeft: '48px', color: 'black', marginTop: '-14%'}}>
                    <Pie options={options} data={chartData} />
                </div>
                <Card.Body>
                    <Card.Text style={{fontSize: '12pt', marginTop: '-17%'}}>
                        As can be seen above there are 4 Types of different Crocodiles.
                        The chart shows the number of species within each type that you get. 
                    </Card.Text>
                </Card.Body>
            </Card>

            <Card style={{marginTop: '2%', marginLeft: '3%' ,padding: '0.7%', width: 400, height: 180, backgroundColor: '#577D92'}}>
                <Card.Title style={{fontSize: '19pt',}}>Litter Size for Pandas</Card.Title>
                <div style={{width: 250, marginLeft: '50px', color: 'black'}}>
                    <Bar options={optionsBar} data={chartHPData}/>
                </div>
            </Card>

            <Card style={{marginTop: '-39%', marginLeft: '35%' ,padding: '1%', width: '35%', backgroundColor: '#577D92'}}>
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
                <Card.Body style={{padding: '3%'}}>
                    <Card.Title>Dataset Outline</Card.Title>
                    <Card.Text>
                        The wild animal dataset can be used to either get information of a certain animal or to compare different 
                        animals with each other for example <i>"Saber Tooth tiger vs Malayan Tiger" </i> or <i>"Cheetah vs Lion"</i>. 
                        The data retrieved from the API can be used to get information about any wild animal like the name of the 
                        animal, the taxomy, the location where they live and other specific characteristics about the animal chosen 
                        form the dataset.<br />
                        <br />
                        Some characteristics of the wild animals that can easily be compared with each other are taxomy (<i>The 
                        order on food chain</i>), location where you can find them and characteristics like <i>Prey (what they eat), 
                        Estimated Population Size, Habitat (where they live), Gestation Period, Average Litter Size, Number of 
                        Species, Skin Type, Top Speed, Lifespan, Weight, Height and Age of Weaning</i>.
                    </Card.Text>
                </Card.Body>
            </Card>      
        </div>

    )
}

export default Landing;