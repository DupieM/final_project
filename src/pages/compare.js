import React from "react";
import { useState, useEffect } from 'react';
import { Chart as Chartjs } from 'chart.js/auto'
import {Bar} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import { Radar } from 'react-chartjs-2';
import axios from "axios";

function Compare() {

    const [animalData, setAnimalData] = useState([]);
    const [animalData1, setAnimalData1] = useState([]);
    const [animalNames, setAnimalNames] = useState([]);
    const [animalNames1, setAnimalNames1] = useState([]);
    const [animalTopSpeed, setAnimalTopSpeed] = useState([]);
    const [animalTopSpeed1, setAnimalTopSpeed1] = useState([]);
    const [animalNumberSpecies, setAnimalNumberSpecies] = useState([]);
    const [animalNumberSpecies1, setAnimalNumberSpecies1] = useState([]);
    const [Char1, setChar1] = useState([]);
    const [Char2, setChar2] = useState([]);
    
    // Array for radar
    let animal1 =[]
    let animal2 =[]

    // Format data for Bar chart
    const chartData = {
        labels: ['Top Speed'],
        datasets: [
          {
            label: animalNames,
            data: animalTopSpeed,
            backgroundColor: 'rgba(195, 176, 0, 0.6)',
            borderColor: 'rgba(34, 81, 107, 0.5)',
          },
          {
            label: animalNames1,
            data: animalTopSpeed1,
            backgroundColor: 'rgba(53, 162, 235, 0.6)',
            borderColor: 'rgba(53, 162, 235, 0.5)',
          },
        ]
    }

    // Format data for Pie chart
    const chartData1 = {
        labels: [animalNames, animalNames1],
        datasets: [
          {
            label: 'Number of species',
            data: [animalNumberSpecies, animalNumberSpecies1],
            backgroundColor: ['rgba(195, 176, 0, 0.6)', 'rgba(53, 162, 235, 0.6)'],
          },
        ]
    }

    // Format data for Radar chart
    const chartData2 = {
        labels: ['Age of Weaning', 'Gestation Period', 'Life Span', 'Sexual Maturity', 'Weight', 'Height'],
        datasets: [
          {
            label: "Name1",
            data: Char1,
            backgroundColor: 'rgba(195, 176, 0, 0.6)',
          },
          {
            label: "Name2",
            data: Char2,
            backgroundColor: 'rgba(53, 162, 235, 0.6)',
          },
        ]
    }

    return (
        <div className="App">
            <div style={{width: 490, marginLeft: 7, marginTop: 5}}>
                <Bar data={chartData} />
            </div>
            <select onChange={(e) => {
                console.log(e.target.value)
                axios({
                    method: "GET",
                    url: 'https://api.api-ninjas.com/v1/animals?name=' + e.target.value,
                    headers: { 'X-Api-Key': 'p31mA3zAJl7xjNaNX7Zdaw==Ms3ncGa9PnAHgpIi'},
                    contentType: 'application/json',
                  })
                  .then((response) => { 
                  setAnimalData(response.data)
                  const getAnimalNames = response.data.map((animal) => animal.name);
                  const animalTopSpeed = response.data.map((animal) => animal.characteristics.top_speed.slice(0,2));
                  const animalNumberSpecies = response.data.map((animal) => animal.characteristics.number_of_species);
                  const animalAgeWeaning = response.data[0].characteristics.age_of_weaning.split("")[0];
                  const animalGestationPeriod = response.data[0].characteristics.gestation_period.slice(0,2);
                  const animalLifeSpan = response.data[0].characteristics.lifespan.slice(0,2);
                  const animalAgeSexualMaturity = response.data[0].characteristics.age_of_sexual_maturity.split("")[0];
                  const animalWeight = response.data[0].characteristics.weight.slice(0,2);
                  const animalHeight = response.data[0].characteristics.length.slice(0,2);

                  animal1.push(animalAgeWeaning);
                  animal1.push(animalGestationPeriod);
                  animal1.push(animalLifeSpan);
                  animal1.push(animalAgeSexualMaturity);
                  animal1.push(animalWeight);
                  animal1.push(animalHeight);

                  setAnimalNames(getAnimalNames);
                  setAnimalTopSpeed(animalTopSpeed);
                  setAnimalNumberSpecies(animalNumberSpecies);
                  setChar1(animal1);
                })
                }}>
                <option value="">Choose Animal</option>
                <option value="clouded leopard">Clouded Leopard</option>
            </select>
            <select onChange={(d) => {
                console.log(d.target.value)
                axios({
                    method: "GET",
                    url: 'https://api.api-ninjas.com/v1/animals?name=' + d.target.value,
                    headers: { 'X-Api-Key': 'p31mA3zAJl7xjNaNX7Zdaw==Ms3ncGa9PnAHgpIi'},
                    contentType: 'application/json',
                  })
                  .then((response) => { 
                  setAnimalData1(response.data)
                  const getAnimalNames1 = response.data.map((animal) => animal.name);
                  const animalTopSpeed1 = response.data.map((animal) => animal.characteristics.top_speed.slice(0,2));
                  const animalNumberSpecies1 = response.data.map((animal) => animal.characteristics.number_of_species);
                  const animalAgeWeaning1 = response.data[0].characteristics.age_of_weaning.slice(0,1);
                  const animalGestationPeriod1 = response.data[0].characteristics.gestation_period.slice(7,10);
                  const animalLifeSpan1 = response.data[0].characteristics.lifespan.slice(0,2);
                  const animalAgeSexualMaturity1 = response.data[0].characteristics.age_of_sexual_maturity.slice(0,1);
                  const animalWeight1 = response.data[0].characteristics.weight.slice(6,8);
                  const animalHeight1 = response.data[0].characteristics.height.split("")[0];

                  console.log(animalWeight1);
                  console.log(animalGestationPeriod1);

                  animal2.push(animalAgeWeaning1);
                  animal2.push(animalGestationPeriod1);
                  animal2.push(animalLifeSpan1);
                  animal2.push(animalAgeSexualMaturity1);
                  animal2.push(animalWeight1);
                  animal2.push(animalHeight1);

                  setAnimalNames1(getAnimalNames1);
                  setAnimalTopSpeed1(animalTopSpeed1);
                  setAnimalNumberSpecies1(animalNumberSpecies1);
                  setChar2(animal2);
                })
                }}>
                <option value="">Choose Animal</option>
                <option value="cape lion">Cape Lion</option>
            </select>

            <div style={{width: 340, marginLeft: 7, marginTop: 5}}>
                <Pie data={chartData1} />
            </div>
            <div style={{width: 560, marginLeft: 7, marginTop: 5}}>
                <Radar data={chartData2} />
            </div>
        </div>
    )
}

export default Compare;