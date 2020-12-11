import React, { useState, useEffect } from 'react';
import './App.css';


function App() {

    const DOG_CEO_API = 'https://dog.ceo/api';

    // Fetch all the dog breeds for validation reasons.
    const [ breedsJSON, setBreedsJSON ] = useState( [] );
    useEffect( () => {
        fetch( DOG_CEO_API + '/breeds/list/all' )
        .then( res => res.json() )
        .then( data => {
            setBreedsJSON( data.message );
        });
    }, [] );

    // Search: search and image retrieval's callback.
    const [ textfieldValue, setTextfieldValue ] = useState('');
    const handleTextInput = event => {
        setTextfieldValue( event.target.value );
    };
    const handleClick = event => {
        console.log( event.target.text );
        setTextfieldValue( event.target.text );
    };
    const [ imageURL, setImageURL ] = useState('');
    const [ imageCaption, setImageCaption ] = useState('');
    const searchText = () => {
        //console.log( textfieldValue );
        if ( breedsJSON.hasOwnProperty( textfieldValue ) ) {
            fetch( DOG_CEO_API + '/breed/' + textfieldValue + '/images' )
            .then( res => res.json() )
            .then( data => {
                setImageURL( data.message[0] );
                setImageCaption( textfieldValue );
            //console.log( breedsJSON );
            });
        } else {
            // Breed not found. Ignore input.
            setImageURL(
                'https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png'
            );
            setImageCaption( '' );
        }
    };

    // Selection: Item addition and removal's callbacks.
    const [ selectionList, setSelectionList ] = useState( [] );
    const addCollectionItem = () => {
        if ( breedsJSON.hasOwnProperty( textfieldValue ) ) {
            if ( selectionList.includes( textfieldValue ) ) {} else {
                var tmp_array = selectionList.slice();
                tmp_array.push( textfieldValue );
                setSelectionList( tmp_array );
            };
        };
    };
    const addRandomCollectionItem = () => {

        var all_breeds = Object.keys( breedsJSON ).slice();
        var available_breeds = all_breeds.filter(
            function( breed ) {
                if( selectionList.indexOf( breed ) === -1)
                    return true;
                else
                    return false;
            }
        );
        var random_breed = available_breeds[ Math.floor( Math.random() * ( available_breeds.length - 1 ) ) ];
        setTextfieldValue( random_breed );

        var tmp_array = selectionList.slice();
        tmp_array.push( random_breed );
        setSelectionList( tmp_array );
    };
    const removeCollectionItem = () => {
        setSelectionList(
            selectionList.slice(0).filter( item => item !== textfieldValue )
        );
    };

    return (

        <div className="App">
            <header className="App-header">
                <table style={{width:"100%"}}>
                    <tr style={{"vertical-align":"top"}}>
                        <td>
                        <th>Dog Breed Selection list</th>
                            <div style={{textAlign:"left"}}>
                                <ul>
                                    { selectionList.map( function( item ) {
                                        return <li style={{color:"#F07740"}} key={ item }>{ item }</li>;
                                    })}
                                </ul>
                            </div>
                        </td>
                        <td style={{"vertical-align":"top"}}>
                        <th>Dog Breed and exemplar</th>
                            <p style={{textAlign:"left", color:"#F04077"}}>{ imageCaption }</p>
                            <div style={{textAlign:"left"}}>
                                <img src={ imageURL } alt="" width="300"/>
                            </div>
                        </td>
                        <td style={{"vertical-align":"top"}}>
                            <div style={{textAlign:"left"}}>
                                <tr>
                                    <input value={ textfieldValue } onChange={ handleTextInput } placeholder="Type or select a breed"/>
                                    <div className="dropdown">
                                        <button className="dropbtn">Available Breeds</button>
                                        <div className="dropdown-content">
                                            { Object.keys( breedsJSON ).map( breed => (
                                                <a style={{"fontSize":"11px"}} onClick={ handleClick } href="#" key={ breed }>{ breed }</a>
                                            ))}
                                        </div>
                                    </div>
                                </tr>
                                <tr>
                                    <button onClick={ searchText }>Search</button>
                                </tr>
                                <tr>
                                    <button onClick={ addCollectionItem }>Add breed to Collection</button>
                                </tr>
                                <tr>
                                    <button onClick={ addRandomCollectionItem }>Randomly add breed to Collection</button>
                                </tr>
                                <tr>
                                    <button onClick={ removeCollectionItem }>Remove Breed from Collection</button>
                                </tr>
                            </div>
                        
                        </td>
                    </tr>
                </table>
            </header>
        </div>

    );
}

export default App;
