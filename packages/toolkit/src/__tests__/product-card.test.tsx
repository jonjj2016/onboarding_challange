import '@testing-library/jest-dom'; // Provides matchers like toBeInTheDocument
import { fireEvent, render, screen } from '@testing-library/react';

import { ProductCard } from '../components/product-card/product-card';

const mockProduct = {
  id: 'test-id-123',
  name: 'Chef Knife',
  price: 149.95,
  imageUrl: 'https://example.com/knife.jpg',
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText('Chef Knife')).toBeInTheDocument();
    expect(screen.getByText('$149.95')).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProduct.imageUrl);
    expect(image).toHaveAttribute('alt', mockProduct.name);
  });

  it('calls onRemove with the correct id when the close button is clicked', () => {
    const handleRemove = jest.fn();
    render(<ProductCard product={mockProduct} onRemove={handleRemove} />);

    // Since our button has a CloseIcon, we find it by the button role
    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);

    expect(handleRemove).toHaveBeenCalledTimes(1);
    expect(handleRemove).toHaveBeenCalledWith('test-id-123');
  });

  it('prevents event propagation on the remove button', () => {
    const handleRemove = jest.fn();
    const handleParentClick = jest.fn();

    render(
      <section onClick={handleParentClick}>
        <ProductCard product={mockProduct} onRemove={handleRemove} />
      </section>,
    );

    const removeButton = screen.getByRole('button');
    fireEvent.click(removeButton);

    // handleRemove should trigger, but parent click should not
    expect(handleRemove).toHaveBeenCalled();
    expect(handleParentClick).not.toHaveBeenCalled();
  });

  it('hides the remove button if onRemove is not provided', () => {
    render(<ProductCard product={mockProduct} />);

    const removeButton = screen.queryByRole('button');
    expect(removeButton).toBeNull();
  });

  it('applies correct elevation when in drag overlay mode', () => {
    const { container } = render(<ProductCard product={mockProduct} dragOverlay={true} />);

    // MUI Card adds classes based on elevation prop (e.g., MuiPaper-elevation8)
    const cardElement = container.firstChild;
    expect(cardElement).toHaveClass('MuiPaper-elevation8');
  });

  it('handles price formatting correctly for whole numbers', () => {
    const cheapProduct = { ...mockProduct, price: 10 };
    render(<ProductCard product={cheapProduct} />);

    // Should display $10.00 due to .toFixed(2) in component
    expect(screen.getByText('$10.00')).toBeInTheDocument();
  });
});
