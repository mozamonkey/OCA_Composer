import React from 'react';
import HelpPageContainer from '../components/HelpPageContainer';
import HelpPageH2Title from '../components/HelpPageH2Title';
import TypographyTag from '../components/TypographyTag';

const LanguageAttributeHelp = () => {
  return (
    <HelpPageContainer>
      <HelpPageH2Title text="Language Dependent Attribute Details" />
      <br />
      <TypographyTag>
        The structure of OCA allows for internationalization, where multiple languages can be represented in a single schema without disturbing the underlying structure of the data. This helps with data interoperability and international usability.
      </TypographyTag>
      <br />
      <TypographyTag>
        It is most likely that your Label will be the same as your Attribute Name (if they are the same language). If your Attribute Name is really cryptic (e.g. ‘sC’) you can give this a better (brief) label like “Substrate Concentration”. This is also your opportunity to give language specific labels to attribute names (such as ‘Name’ in English or ‘Nom’ in French).
      </TypographyTag>
      <br />
      <TypographyTag>
        Description is where you can describe (in the specific language) your attribute in more detail which will be very helpful for other users. Is this attribute measured in a specific way? Do you have a specific way it was sampled? Does this attribute represent the name of the sample on the tube in your sample library? Can you give details about the units so there is no ambiguity?
      </TypographyTag>
    </HelpPageContainer>
  );
};

export default LanguageAttributeHelp;