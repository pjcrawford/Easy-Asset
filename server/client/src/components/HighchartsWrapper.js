import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const HighchartsWrapper = (props) => {
   console.log(props.chartData); 

    let options = {
        title: { text: 'My chart' },
        series: props.chartData
    }

    return(
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                oneToOne={true}
            />
    );
}

export default HighchartsWrapper;