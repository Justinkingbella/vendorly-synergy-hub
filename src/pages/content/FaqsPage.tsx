
import React, { useState } from 'react';
import StoreLayout from '@/components/layout/StoreLayout';
import { useStoreSettings } from '@/context/StoreSettingsContext';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const FaqsPage = () => {
  const { pages } = useStoreSettings();
  const pageData = pages.faqs;
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample FAQs - in a real app, you would parse these from the content
  const faqs = [
    {
      category: "General Questions",
      items: [
        {
          question: "What is MarketHub?",
          answer: "MarketHub is a multi-vendor marketplace where customers can shop from various verified vendors in Namibia."
        },
        {
          question: "How do I create an account?",
          answer: "Click on the 'Sign In / Register' button in the top right corner of the page and follow the registration instructions."
        },
        {
          question: "Is MarketHub available internationally?",
          answer: "While our primary focus is Namibia, we do ship to select neighboring countries. Check our shipping policy for details."
        }
      ]
    },
    {
      category: "Orders & Shipping",
      items: [
        {
          question: "How do I track my order?",
          answer: "You can track your order by logging into your account and visiting the 'My Orders' section."
        },
        {
          question: "What shipping methods are available?",
          answer: "We offer standard and express shipping options. Delivery times and costs vary based on your location."
        },
        {
          question: "Do you offer free shipping?",
          answer: "Yes, we offer free shipping on orders over N$1000. Some exceptions may apply based on product size and location."
        }
      ]
    },
    {
      category: "Returns & Refunds",
      items: [
        {
          question: "What is your return policy?",
          answer: "We accept returns within 30 days of purchase for most items. Please check our Returns Policy for details."
        },
        {
          question: "How do I initiate a return?",
          answer: "Log into your account, navigate to the order you want to return, and click the 'Return' button."
        },
        {
          question: "How long do refunds take?",
          answer: "Refunds typically take 5-10 business days to process after we receive the returned item."
        }
      ]
    }
  ];
  
  // Filter FAQs based on search query
  const filteredFaqs = searchQuery ? 
    faqs.map(category => ({
      ...category,
      items: category.items.filter(item => 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.items.length > 0) : 
    faqs;

  return (
    <StoreLayout pageId="faqs">
      <div className="container mx-auto px-4 py-8">
        {pageData.bannerImage && (
          <div className="w-full aspect-[3/1] overflow-hidden rounded-lg mb-8">
            <img 
              src={pageData.bannerImage} 
              alt={pageData.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{pageData.title}</h1>
            <p className="text-lg text-muted-foreground">{pageData.subtitle}</p>
          </div>
          
          <div className="relative mb-8 max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              className="pl-10" 
              placeholder="Search FAQs..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {filteredFaqs.length > 0 ? (
            <div className="space-y-8">
              {filteredFaqs.map((category, index) => (
                <div key={index}>
                  <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {category.items.map((item, itemIndex) => (
                      <AccordionItem key={itemIndex} value={`item-${index}-${itemIndex}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p>{item.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No FAQs found matching your search.</p>
            </div>
          )}
          
          <div className="mt-12">
            <div 
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: pageData.content }}
            />
          </div>
        </div>
      </div>
    </StoreLayout>
  );
};

export default FaqsPage;
