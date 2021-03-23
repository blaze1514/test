import React from 'react';
import { connect } from 'react-redux';
import { dataRequest, dataSuccess, dataError } from '../Redux'
import Visualize from './visualize';
import axios from 'axios';

class Home extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            show: false,
            displayData: [],
            title: null,
            loading: false,
        }
    }

    componentDidMount = () => {
        let token = 'Bearer ' + JSON.parse(localStorage.getItem('token')) 
        axios.get('http://localhost:5000/getData',{
            headers: {
                'Authorization': token
            }
        }).then(res => {
            if(res.status === 200){
                this.props.dataSuccess(res.data.data);
            }else if(res.status === 403){
                this.props.dataError("Access error occured");
            }else{
                this.props.dataError('Error occurred')
            }
            this.setState({loading: true})
        }).catch(err => {
            this.props.dataError('Error occurred')
            this.setState({loading: true})
        })
    }

    setDisplayData=(ele) => {
        let a = this.props.data.data[ele];
        let keys = Object.keys(a);
        let displayData = [ ]
        if(keys[0]) {
            displayData.push([keys[0], a[keys[0]] ?  a[keys[0]] : 0])
        }
        if(keys[1]) {
            displayData.push([keys[1], a[keys[1]] ?  a[keys[1]] : 0])
        }

        this.setState({
            displayData,
            show: true,
            title: ele
        },() => console.log(this.state.title, this.state.displayData))
    }

    render(){
        const { show, title, displayData, loading } = this.state;
        const {data} = this.props;
        return(
            <React.Fragment>
                {
                    loading ? show ?
                        <Visualize close={() => this.setState({title: null, displayData: [], show: false})} title={title} data={displayData} />
                    :   <div>                
                            {
                                Object.keys(data.data).length ?
                                    Object.keys(data.data).map(ele => {
                                        return(
                                            
                                            <div onClick={() => this.setDisplayData(ele)} key={ele}>
                                                <h3>{ele}</h3>
                                            </div>
                                        )
                                    })
                                : <p>No data present</p>
                            }
                        </div>
                    : <p>{data.error}</p>
           
                }
            </React.Fragment>
          )
    }
}


const mapStateToProps = (state) => {
    return {
      data: state.data
    }
}
  
const mapDispatchToProps = (dispatch) => {
    return {
      dataRequest: () => dispatch( dataRequest() ),
      dataSuccess: (data) => dispatch( dataSuccess(data) ),
      dataError: (error) => dispatch( dataError(error) ),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Home);