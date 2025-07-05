
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Tag, Info, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';

const categories = [
  'Textbooks',
  'Electronics',
  'Clothing',
  'Furniture',
  'Sports Equipment',
  'Kitchen Items',
  'Stationery',
  'Other'
];

const conditions = [
  'New',
  'Like New',
  'Good',
  'Fair',
  'Poor'
];

const ItemListing = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('sell');
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (images.length + newFiles.length > 3) {
        toast({
          title: 'Too many images',
          description: 'You can upload a maximum of 3 images.',
          variant: 'destructive'
        });
        return;
      }
      
      setImages([...images, ...newFiles]);
      
      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews([...previews, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    
    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !category || !condition || !images.length) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields and upload at least one image.',
        variant: 'destructive'
      });
      return;
    }
    
    if (type === 'sell' && !price) {
      toast({
        title: 'Price required',
        description: 'Please enter a price for your item.',
        variant: 'destructive'
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Success message
    toast({
      title: 'Item listed successfully',
      description: type === 'sell' ? 'Your item is now listed for sale.' : 'Your item is now available for donation.',
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setCategory('');
    setCondition('');
    setPrice('');
    setType('sell');
    setImages([]);
    setPreviews([]);
    setIsSubmitting(false);
  };

  return (
    <GlassMorphicCard className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground">List an Item</h3>
          <p className="text-muted-foreground">
            Fill in the details below to list your item for sale or donation.
          </p>
        </div>
        
        {/* Type Toggle */}
        <div className="flex border border-input rounded-lg p-1 bg-background">
          <button
            type="button"
            className={`w-1/2 py-2 rounded-md text-sm font-medium transition-colors ${
              type === 'sell' 
                ? 'bg-primary text-white' 
                : 'text-muted-foreground hover:bg-muted'
            }`}
            onClick={() => setType('sell')}
          >
            Sell
          </button>
          <button
            type="button"
            className={`w-1/2 py-2 rounded-md text-sm font-medium transition-colors ${
              type === 'donate' 
                ? 'bg-green-500 text-white' 
                : 'text-muted-foreground hover:bg-muted'
            }`}
            onClick={() => setType('donate')}
          >
            Donate
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-foreground mb-1">
              Title *
            </label>
            <input
              id="title"
              type="text"
              placeholder="e.g. Physics Textbook"
              className="input-field"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          
          {/* Category & Condition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-foreground mb-1">
                Category *
              </label>
              <select
                id="category"
                className="input-field appearance-none"
                value={category}
                onChange={e => setCategory(e.target.value)}
                required
              >
                <option value="" disabled>Select a category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            {/* Condition */}
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-foreground mb-1">
                Condition *
              </label>
              <select
                id="condition"
                className="input-field appearance-none"
                value={condition}
                onChange={e => setCondition(e.target.value)}
                required
              >
                <option value="" disabled>Select condition</option>
                {conditions.map(cond => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Price (only if selling) */}
          {type === 'sell' && (
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-foreground mb-1">
                Price (₹) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag size={18} className="text-muted-foreground" />
                </div>
                <input
                  id="price"
                  type="number"
                  min="0"
                  placeholder="e.g. 500"
                  className="input-field pl-10"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>
          )}
          
          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-foreground mb-1">
              Description *
            </label>
            <textarea
              id="description"
              placeholder="Describe your item, its features, why you're selling it, etc."
              rows={3}
              className="input-field"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>
          
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Images * (Max 3)
            </label>
            <div className="mt-1 flex flex-wrap items-center gap-4">
              {/* Upload button */}
              {images.length < 3 && (
                <label className="relative cursor-pointer bg-background border border-input rounded-lg overflow-hidden hover:bg-muted/50 transition-colors h-24 w-24 flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center">
                    <Camera size={24} className="text-primary mb-1" />
                    <span className="text-xs font-medium text-center">Upload</span>
                  </div>
                  <input 
                    type="file" 
                    accept="image/*" 
                    multiple
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    onChange={handleImagesChange}
                  />
                </label>
              )}
              
              {/* Preview images */}
              {previews.map((preview, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative h-24 w-24 rounded-lg overflow-hidden border border-border"
                >
                  <img 
                    src={preview} 
                    alt={`Preview ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-background/80 text-foreground rounded-full p-1 backdrop-blur-sm"
                    onClick={() => removeImage(index)}
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground flex items-start">
              <Info size={14} className="mr-1 mt-0.5 flex-shrink-0" />
              Clear, high-quality images from multiple angles will help your item get noticed.
            </p>
          </div>
        </div>
        
        <div className="pt-2">
          <Button 
            type="submit" 
            className={`w-full py-6 shadow-md border-none ${
              type === 'sell'
                ? 'bg-gradient-to-r from-blue-500 to-primary hover:from-blue-600 hover:to-primary/90'
                : 'bg-gradient-to-r from-green-500 to-green-400 hover:from-green-600 hover:to-green-500'
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              type === 'sell' ? 'List for Sale' : 'List for Donation'
            )}
          </Button>
        </div>
      </form>
    </GlassMorphicCard>
  );
};

export default ItemListing;
