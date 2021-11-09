import React from 'react';
import Select, { components } from 'react-select';
import makeAnimated from 'react-select/animated';
import { Form } from 'react-bootstrap';

const animatedComponents = makeAnimated();
/**
 * A multi select built with react select
 * The options are customised to be checkboxes
 * @param {Object} props React.select props, for more information: https://react-select.com/props
 * @returns {React.component}
 */
const MultiSelect = (props) => {
    const customComponents = {
        animatedComponents,
        MultiValueLabel: ({ selectProps }) => {
            if (selectProps?.value?.length === 1) {
                return selectProps?.value[0].label;
            }
            return `Multiple selections (${selectProps?.value?.length})`;
        },
        MultiValueRemove: (itemProps) => {
            const onClick = () => {
                // Removes all the selected options
                itemProps.selectProps.onChange([]);
            };
            const newProps = {
                ...itemProps,
                innerProps: {
                    ...itemProps.innerProps,
                    onClick
                }
            };
            return <components.MultiValueRemove {...newProps} />;
        }
    };

    const formatOptionLabel = ({ value, label }, { selectValue }) => (
        <>
            <Form.Check
                type="checkbox"
                name={label}
                value={value}
                className="multi-select-checkbox"
                id={`multi-select-${value}`}
                checked={selectValue.find((item) => item.value === value) || ''}
                style={{ display: 'inline-block', position: 'relative' }}
                onChange={() => {}}
            />
            <span style={{ marginTop: '-2px', position: 'absolute' }}>{label}</span>
        </>
    );

    return (
        <Select
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            isMulti
            isClearable={false}
            cropWithEllipsis
            formatOptionLabel={formatOptionLabel}
            styles={{
                control: (base) => ({
                    ...base,
                    border: 'none',
                    borderBottom: props.invalid ? '1px solid #E31B23' : 'none',
                    borderRadius: 0,
                    boxShadow: null,
                    height: '28px',
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
                    border: 'none'
                }),
                indicatorSeparator: (base) => ({
                    ...base,
                    display: 'none'
                }),
                menu: (base) => ({
                    ...base,
                    marginTop: 0,
                    zIndex: 10
                }),
                menuList: (base) => ({
                    ...base,
                    margin: 0,
                    padding: 0
                }),
                valueContainer: (base) => ({
                    ...base,
                    paddingLeft: '3px',
                    color: '#4f4f4f',
                    fontWeight: 400,
                    paddingTop: 0,
                    height: '28px',
                    padding: 0,
                    display: 'inline-block',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    lineHeight: '24px',
                    marginLeft: '10px',
                    marginBottom: '6px'
                }),
                multiValue: (base) => ({
                    ...base,
                    backgroundColor: 'transparent',
                    padding: 0
                }),
                multiValueLabel: (base) => ({
                    ...base,
                    margin: 0,
                    padding: 0,
                    color: '#495057',
                    fontSize: '12px'
                }),
                multiValueRemove: () => ({
                    cursor: 'pointer'
                }),
                input: (base) => ({
                    ...base,
                    marginTop: 0,
                    paddingTop: 0,
                    position: 'absolute',
                    left: 0,
                    top: 0
                }),
                option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? '#b2d4ff' : 'transparent',
                    color: '#212529',
                    padding: '2px 8px',
                    height: '18px'
                }),
                placeholder: (base) => ({
                    ...base,
                    color: '#495057',
                    paddingBottom: '3px'
                })
            }}
            {...props}
            components={customComponents}
        />
    );
};

export default MultiSelect;
