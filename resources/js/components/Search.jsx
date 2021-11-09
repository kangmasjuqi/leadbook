import React from 'react';
import {
    Form, InputGroup, FormControl, Button
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSearch
} from '@fortawesome/free-solid-svg-icons';

const Search = ({
    onKeyPress, onChange, onClick, ...props
}) => {
    const handleOnCLick = () => {
        onClick(props.searchKey);
    };

    const handleOnChange = (event) => {
        onChange(event.target.value);
    };

    const handleOnKeyPress = (event) => event.key === 'Enter' && onKeyPress(event);

    return (
        <>
            <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                Search
            </Form.Label>
            <InputGroup className="mb-2 input-search-group">
                <InputGroup.Prepend>
                    <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    type="text"
                    id="search-input-table-manage-clients"
                    className="search-input"
                    placeholder="Search"
                    onChange={handleOnChange}
                    onKeyPress={handleOnKeyPress}
                />
                <InputGroup.Append>
                    <Button
                        onClick={handleOnCLick}
                        className="button-search-filter"
                    >
                        Search
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </>
    );
};

export default Search;
