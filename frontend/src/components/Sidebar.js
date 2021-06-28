import React, { useState } from 'react';
import { ButtonGroup, ToggleButton, Card, Form } from 'react-bootstrap';

import ProductCarasoul from './ProductCarasoul';

const Sidebar = () => {
  const [radioValue, setRadioValue] = useState('');

  const radios = [
    { name: ' Sort By Price ', value: 'price' },
    { name: ' Sort By Rating ', value: 'rating' },
  ];
  return (
    <div className="sidebar my-3 sticky-lg-top">
      <Card style={{ maxHeight: '50%' }} className="mt-3 bg-white shadow">
        <Form className="p-3">
          <ButtonGroup toggle>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                type="radio"
                variant="secondary"
                name="radio"
                size="md"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Form>
      </Card>
      <h1 className="my-4 text-center">Top Products</h1>
      <div className="my-3 background_color ">
        <ProductCarasoul />
      </div>
    </div>
  );
};

export default Sidebar;
