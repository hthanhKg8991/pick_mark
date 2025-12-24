// SelectFontTab.tsx
import React, { FC } from 'react';

import { FontSelector } from './FontSelector';
import { FONT_LIST } from 'Constants/fonts';

type Props = {
    selectedFontKey: string;
    onSelectFont: (key: string) => void;
    signatureName: string;
};

const SelectFontTab: FC<Props> = ({ selectedFontKey, onSelectFont, signatureName }) => {
    return (
        <FontSelector
            // key={selectedFontKey}
            signatureName={signatureName}
            fonts={FONT_LIST}
            selectedFontKey={selectedFontKey}
            onSelectFont={onSelectFont}
        />
    );
};

export default SelectFontTab;
