
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash } from 'lucide-react';

interface FeatureListInputProps {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
}

const FeatureListInput: React.FC<FeatureListInputProps> = ({ 
  label, 
  items, 
  onChange 
}) => {
  // Function to add a new item
  const addItem = () => {
    onChange([...items, '']);
  };

  // Function to update an item at a specific index
  const updateItem = (index: number, value: string) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange(newItems);
  };

  // Function to remove an item at a specific index
  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    onChange(newItems);
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <Input
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => removeItem(index)}
            disabled={items.length === 1}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button variant="secondary" size="sm" onClick={addItem}>
        <Plus className="h-4 w-4 mr-2" />
        Add {label === "Features" ? "Feature" : "Item"}
      </Button>
    </div>
  );
};

export default FeatureListInput;
