import React, { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';

const SearchSelect = (props) => {
    const [options, setOptions] = useState(props.options);

    /**
     * @returns {Array} - Returns an array of options to select,
     *                    if a default value  (custom option) is not on the initial option array
     *                    this one is added to be displayed.
     */
    const getOptions = () => {
        if (props.defaultValue) {
            if (props.options.find((item) => item.value === props.defaultValue?.value)) {
                return options;
            }
            return [props.defaultValue, ...props.options];
        }
        return options;
    };

    useEffect(() => {
        setOptions(getOptions());
    }, []);

    return (
        <CreatableSelect
            formatCreateLabel={(val) => val}
            filterOption={(item) => item}
            createOptionPosition="first"
            hideSelectedOptions={false}
            styles={{
                control: (base) => ({
                    ...base,
                    border: 'none',
                    borderBottom: props.invalid ? '1px solid #E31B23' : 'none',
                    borderRadius: 0,
                    boxShadow: null,
                    height: '25px',
                    minHeight: '25px'
                }),
                dropdownIndicator: (base) => ({
                    ...base,
                    color: '#4f4f4f',
                    marginRight: 0,
                    paddingRight: 0,
                    width: 24
                }),
                indicatorsContainer: (base) => ({
                    ...base,
                    border: 'none',
                    height: '25px'
                }),
                indicatorSeparator: (base) => ({
                    ...base,
                    display: 'none'
                }),
                menu: (base) => ({
                    ...base,
                    marginTop: 0
                }),
                option: (base) => ({
                    ...base,
                    padding: '0 8px'
                }),
                valueContainer: (base) => ({
                    ...base,
                    paddingLeft: '3px',
                    color: '#4f4f4f',
                    fontWeight: 400,
                    height: '25px',
                    paddingTop: 0
                }),
                input: (base) => ({
                    ...base,
                    marginTop: 0,
                    paddingTop: 0
                })
            }}
            {...props}
            options={options}
        />
    );
};

export default SearchSelect;
