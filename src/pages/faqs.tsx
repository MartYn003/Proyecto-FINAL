import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { faqsData } from '../components/faqs/faqsData'; // Asegúrate de que la ruta sea correcta
import LayoutGeneral from '../components/layouts/layout-general';

const FaqsPage: React.FC = () => {
    return (
        <LayoutGeneral>
        <Box my={10}>
        <div>
            <Typography variant="h4" component="h1" gutterBottom>
                Preguntas Frecuentes
            </Typography>
            {faqsData.map(faq => (
                <Accordion key={faq.id} sx={{ mb: 2 }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${faq.id}-content`}
                        id={`panel${faq.id}-header`}
                    >
                        <Typography variant="h6">{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{faq.answer}</Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
        </Box>
        </LayoutGeneral>
    );
};

export default FaqsPage;