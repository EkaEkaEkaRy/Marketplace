import { useState, useCallback } from 'react';

const useSelect = (options = []) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleOption = useCallback(
    (option) => {
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((o) => o !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    },
    [selectedOptions]
  );

  const isOptionSelected = useCallback(
    (option) => selectedOptions.includes(option),
    [selectedOptions]
  );

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const removeOption = useCallback(
    (option) => {
      setSelectedOptions(selectedOptions.filter((o) => o !== option));
    },
    [selectedOptions]
  );

  return {
    selectedOptions,
    toggleOption,
    isOptionSelected,
    filteredOptions,
    isOpen,
    toggleDropdown,
    handleSearch,
    removeOption,
  };
};

export default useSelect;