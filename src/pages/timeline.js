import React from "react";
import { useState, useEffect } from 'react';
import { Chart as Chartjs } from 'chart.js/auto'
import {Line} from 'react-chartjs-2';
import Background from './background2.jpg';
import { Card } from "react-bootstrap"
import axios from "axios";

function Timeline() {

    const [tigerData, setTigerData] = useState([]);
    const [tigerNames, setTigerNames] = useState([]);
    const [litterSizes, setLitterSizes] = useState([]);
  
    useEffect(() => {
      axios({
        method: "GET",
        url: "https://api.api-ninjas.com/v1/animals?name=tiger",
        headers: { 'X-Api-Key': 'p31mA3zAJl7xjNaNX7Zdaw==Ms3ncGa9PnAHgpIi'},
        contentType: 'application/json',
      })
      .then((response) => {
        // console.log(response.data)
        setTigerData(response.data)
  
        // Extract tiger names and average litter sizes from response data
        const getTigerNames = response.data.map((tiger) => tiger.name);
        const tigerLitterSizes = response.data.map((tiger) => tiger.characteristics.average_litter_size);

        
        // Update state variables
        setTigerNames(getTigerNames);
        setLitterSizes(tigerLitterSizes);
  
        console.log(getTigerNames);
        console.log(tigerLitterSizes);
      })
    }, [])
  
    // Format data for line chart
    const chartData = {
      labels: tigerNames,
      datasets: [
        {
          label: 'Average litter size',
          data: litterSizes,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ]
    }
  
      return (
        <div className="App">
            <div style={{ margin: '0px' }}>
                <img src={Background} alt="tiger" style={{ width: '1423px', height: '710px'}}/>
            </div>

            <Card style={{marginTop: '-46%', marginLeft: '8%' ,padding: '1%', width: 1200, backgroundColor: 'white', height: 600}}>
                <div style={{width: 1100, marginLeft: 10, marginTop: 4}}>
                    <Line data={chartData} />
                </div>
            </Card>
            
        </div>
      )
}

export default Timeline;