import React from 'react';
import HighCharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';


class Visualize extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            options: {
                chart: {
                    type: 'column'
                },
                title: {
                    text: this.props.title,
                },
                series: [{
                    type: 'column',
                    name: 'Sales count',
                    data: this.props.data,
                }]
            }
        }
    }

    render(){
        return(
            <div>
                <div>
                    <button onClick={() => this.props.close()} >close</button>
                </div>
                
                <HighChartsReact
                    highcharts={HighCharts}
                    options={this.state.options}
                />
            </div>
        )
    }
}

export default Visualize;