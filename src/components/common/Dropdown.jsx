import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'proptypes';
import classNames from 'classnames';
import DropdownItem from './DropdownItem';

const Dropdown = ({
  id,
  list,
  title,
  handleClick,
  width,
  style,
  open,
  hoverable,
  rightAligned,
  dropUp,
}) => {
  const dropdownNode = useRef();
  const [isOpen, updateIsOpen] = useState(open);
  const [currentSelection, updateSelection] = useState(title);
  const dropdownClassName = classNames('dropdown', {
    'is-active': isOpen,
    'is-hoverable': hoverable,
    'is-right': rightAligned,
    'is-up': dropUp,
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Clicked inside dropdown
      if (dropdownNode.current.contains(e.target) || !isOpen) {
        return;
      }
      // Clicked outside dropdown
      updateIsOpen(false);
    };

    const handleEscapeKeydown = (e) => {
      // Non-esc key pressed
      if (e.keyCode !== 27 || !isOpen) {
        return;
      }
      updateIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKeydown);
    } else {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKeydown);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKeydown);
    };
  }, [isOpen, currentSelection]);

  const toggleOpen = () => updateIsOpen((prevIsOpen) => !prevIsOpen);

  const handleItemClick = (e) => {
    e.preventDefault();
    updateSelection(e.currentTarget.textContent);
    updateIsOpen(false);
    handleClick(e);
  };

  const renderDropdownItems = (items) => items.map((item) => (
    <DropdownItem
      key={item.label}
      label={item.label}
      value={item.value}
      active={item.label === currentSelection}
      width={width}
      handleClick={handleItemClick}
    />
  ));

  return (
    <div
      id={id}
      ref={dropdownNode}
      className={dropdownClassName}
      style={{ width, ...style }}
    >
      <div
        className="dropdown-trigger"
        onClick={toggleOpen}
        style={{ width: '100%' }}
        role="presentation"
      >
        <button
          type="button"
          className="button"
          style={{ display: 'block', width: '100%' }}
        >
          <span
            id="dropdown-title"
            style={{ float: 'left' }}
          >
            {currentSelection}
          </span>
          <span
            id="dropdown-icon"
            style={{ float: 'right' }}
          >
            { /* replace with fas icons once Icon component is merged in */ }
            { isOpen ? '⌃' : '⌄' }
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          { renderDropdownItems(list) }
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

Dropdown.propTypes = {
  id: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })).isRequired,
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  width: PropTypes.string,
  style: PropTypes.shape({}),
  open: PropTypes.bool,
  hoverable: PropTypes.bool,
  rightAligned: PropTypes.bool,
  dropUp: PropTypes.bool,
};

Dropdown.defaultProps = {
  width: '350px',
  style: undefined,
  open: false,
  hoverable: false,
  rightAligned: false,
  dropUp: false,
};
