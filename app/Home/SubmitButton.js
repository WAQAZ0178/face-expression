import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useFormikContext} from 'formik';

import defaultScreen from './Screen';

function SubmitButton({title}) {
    const {handleSubmit} = useFormikContext();
    return (
        <TouchableOpacity
            style = {defaultScreen.button} 
            onPress = {handleSubmit}
        >
            <Text style = {defaultScreen.press} > {title} </Text>
        </TouchableOpacity>
    );
}

export default SubmitButton;