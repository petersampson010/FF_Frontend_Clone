import React, { Component } from 'react';
import { Button, Image, View, Text } from 'react-native';
import { headers } from '../../styles/textStyle';
import GwScore from '../gwScore/gwScore';

class NoScoreGW extends Component {
    state = {  }
    render() { 
        return ( 
            <View>
                {this.props.topPlayer ? 
                <Text style={headers}>No Games Played Yet!</Text>
                :
                <View>
                    <GwScore/>
                    <Text style={headers}>No Points Were Scored For This Gameweek! Maybe someone else should take over the admin account..</Text>
                </View>
                }
            </View>
         );
    }
}

export const mapStateToProps = state => {
    return {
        topPlayer: state.homeGraphics.topPlayer
    }
}
 
export default NoScoreGW;