import React, { Component } from 'react';
import { TouchableHighlightBase } from 'react-native';
import { View, Text, StyleSheet, Modal, Button } from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';
import { connect } from 'react-redux';
import { labelText, standardText } from '../../styles/textStyle';
import { pitchHead } from './style';


class PitchHead extends Component {
    state = {  }

    // componentDidMount() {
    //     console.log(this.props.latestUG);
    // }

    comp1 = () => {
        switch(this.props.type) {
            case 'points': 
                return <Text>Points: {this.props.latestUG.total_points}</Text>;
            case 'transfers':
                    return <View>
                        <Text style={labelText}>Transfers Available: {this.props.user.transfers}</Text>
                        <View style={{flexDirection: "row"}}><Text style={labelText}>Budget: </Text><Text style={{...labelText, color: (this.props.budget>=0 ? 'green' : 'red')}}>{this.props.budget}m</Text></View>
                    </View>;
                return 
            case 'pickTeam':
                return <Text></Text>;
            default: 
                return;
        }
    }

    comp2 = () => {
        switch(this.props.type) {
            case 'points': 
                return <Text>XXX</Text>;
            case 'transfers':
                return <Button title="Confirm" onPress={this.props.update}/>
            case 'pickTeam':
                return <Button title="Confirm" onPress={this.props.update}/>
            default: 
                return;
        }
    }

    render() { 
        return ( 
            <View style={pitchHead}>
                {this.comp1()}
                {this.comp2()}
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        latestUG: state.joiners.latestUG,
        user: state.endUser.user
    }
}
 
export default connect(mapStateToProps)(PitchHead);