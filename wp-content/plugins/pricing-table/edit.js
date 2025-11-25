import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, URLInput } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const {
    plan1Title, plan1Description, plan1Price, plan1Features, plan1ButtonText, plan1ButtonUrl,
    plan2Title, plan2Description, plan2Price, plan2Features, plan2ButtonText, plan2ButtonUrl,
    plan3Title, plan3Description, plan3Price, plan3Features, plan3ButtonText, plan3ButtonUrl,
    featuredBgColor, featuredTextColor, normalBgColor, normalTextColor, buttonColor, buttonTextColor
  } = attributes;

  const colors = [
    { name: 'Indigo', color: '#4F46E5' },
    { name: 'Blue', color: '#3B82F6' },
    { name: 'Green', color: '#10B981' },
    { name: 'Red', color: '#EF4444' },
    { name: 'Purple', color: '#8B5CF6' },
    { name: 'Gray', color: '#6B7280' },
    { name: 'White', color: '#FFFFFF' },
    { name: 'Black', color: '#1F2937' }
  ];

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Featured Plan Colors', 'custom-pricing-table')} initialOpen={true}>
          <p><strong>{__('Background Color', 'custom-pricing-table')}</strong></p>
          <ColorPalette
            colors={colors}
            value={featuredBgColor}
            onChange={(value) => setAttributes({ featuredBgColor: value })}
          />
          <p><strong>{__('Text Color', 'custom-pricing-table')}</strong></p>
          <ColorPalette
            colors={colors}
            value={featuredTextColor}
            onChange={(value) => setAttributes({ featuredTextColor: value })}
          />
        </PanelBody>
        <PanelBody title={__('Normal Plan Colors', 'custom-pricing-table')} initialOpen={false}>
          <p><strong>{__('Background Color', 'custom-pricing-table')}</strong></p>
          <ColorPalette
            colors={colors}
            value={normalBgColor}
            onChange={(value) => setAttributes({ normalBgColor: value })}
          />
          <p><strong>{__('Text Color', 'custom-pricing-table')}</strong></p>
          <ColorPalette
            colors={colors}
            value={normalTextColor}
            onChange={(value) => setAttributes({ normalTextColor: value })}
          />
        </PanelBody>
        <PanelBody title={__('Button Colors', 'custom-pricing-table')} initialOpen={false}>
          <p><strong>{__('Button Background', 'custom-pricing-table')}</strong></p>
          <ColorPalette
            colors={colors}
            value={buttonColor}
            onChange={(value) => setAttributes({ buttonColor: value })}
          />
          <p><strong>{__('Button Text', 'custom-pricing-table')}</strong></p>
          <ColorPalette
            colors={colors}
            value={buttonTextColor}
            onChange={(value) => setAttributes({ buttonTextColor: value })}
          />
        </PanelBody>
        <PanelBody title={__('Button Links', 'custom-pricing-table')} initialOpen={false}>
          <TextControl
            label={__('Plan 1 Button URL', 'custom-pricing-table')}
            value={plan1ButtonUrl}
            onChange={(value) => setAttributes({ plan1ButtonUrl: value })}
          />
          <TextControl
            label={__('Plan 2 Button URL', 'custom-pricing-table')}
            value={plan2ButtonUrl}
            onChange={(value) => setAttributes({ plan2ButtonUrl: value })}
          />
          <TextControl
            label={__('Plan 3 Button URL', 'custom-pricing-table')}
            value={plan3ButtonUrl}
            onChange={(value) => setAttributes({ plan3ButtonUrl: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...useBlockProps()}>
        <div className="pricing-table">
          <div className="pricing-column" style={{ backgroundColor: normalBgColor, color: normalTextColor }}>
            <RichText
              tagName="h3"
              className="pricing-title"
              value={plan1Title}
              onChange={(value) => setAttributes({ plan1Title: value })}
              placeholder={__('Plan Title', 'custom-pricing-table')}
            />
            <RichText
              tagName="p"
              className="pricing-description"
              value={plan1Description}
              onChange={(value) => setAttributes({ plan1Description: value })}
              placeholder={__('Description', 'custom-pricing-table')}
            />
            <RichText
              tagName="div"
              className="pricing-price"
              value={plan1Price}
              onChange={(value) => setAttributes({ plan1Price: value })}
              placeholder={__('$0', 'custom-pricing-table')}
            />
            <RichText
              tagName="div"
              className="pricing-features"
              value={plan1Features}
              onChange={(value) => setAttributes({ plan1Features: value })}
              placeholder={__('Add features...', 'custom-pricing-table')}
              multiline="br"
            />
            <RichText
              tagName="span"
              className="pricing-button"
              value={plan1ButtonText}
              onChange={(value) => setAttributes({ plan1ButtonText: value })}
              placeholder={__('Button Text', 'custom-pricing-table')}
              style={{ backgroundColor: buttonColor, color: buttonTextColor }}
            />
          </div>

          <div className="pricing-column pricing-featured" style={{ backgroundColor: featuredBgColor, color: featuredTextColor }}>
            <div className="featured-badge">{__('Recommended', 'custom-pricing-table')}</div>
            <RichText
              tagName="h3"
              className="pricing-title"
              value={plan2Title}
              onChange={(value) => setAttributes({ plan2Title: value })}
              placeholder={__('Plan Title', 'custom-pricing-table')}
            />
            <RichText
              tagName="p"
              className="pricing-description"
              value={plan2Description}
              onChange={(value) => setAttributes({ plan2Description: value })}
              placeholder={__('Description', 'custom-pricing-table')}
            />
            <RichText
              tagName="div"
              className="pricing-price"
              value={plan2Price}
              onChange={(value) => setAttributes({ plan2Price: value })}
              placeholder={__('$0', 'custom-pricing-table')}
            />
            <RichText
              tagName="div"
              className="pricing-features"
              value={plan2Features}
              onChange={(value) => setAttributes({ plan2Features: value })}
              placeholder={__('Add features...', 'custom-pricing-table')}
              multiline="br"
            />
            <RichText
              tagName="span"
              className="pricing-button pricing-button-featured"
              value={plan2ButtonText}
              onChange={(value) => setAttributes({ plan2ButtonText: value })}
              placeholder={__('Button Text', 'custom-pricing-table')}
              style={{ backgroundColor: buttonTextColor, color: buttonColor }}
            />
          </div>

          <div className="pricing-column" style={{ backgroundColor: normalBgColor, color: normalTextColor }}>
            <RichText
              tagName="h3"
              className="pricing-title"
              value={plan3Title}
              onChange={(value) => setAttributes({ plan3Title: value })}
              placeholder={__('Plan Title', 'custom-pricing-table')}
            />
            <RichText
              tagName="p"
              className="pricing-description"
              value={plan3Description}
              onChange={(value) => setAttributes({ plan3Description: value })}
              placeholder={__('Description', 'custom-pricing-table')}
            />
            <RichText
              tagName="div"
              className="pricing-price"
              value={plan3Price}
              onChange={(value) => setAttributes({ plan3Price: value })}
              placeholder={__('$0', 'custom-pricing-table')}
            />
            <RichText
              tagName="div"
              className="pricing-features"
              value={plan3Features}
              onChange={(value) => setAttributes({ plan3Features: value })}
              placeholder={__('Add features...', 'custom-pricing-table')}
              multiline="br"
            />
            <RichText
              tagName="span"
              className="pricing-button"
              value={plan3ButtonText}
              onChange={(value) => setAttributes({ plan3ButtonText: value })}
              placeholder={__('Button Text', 'custom-pricing-table')}
              style={{ backgroundColor: buttonColor, color: buttonTextColor }}
            />
          </div>
        </div>
      </div>
    </>
  );
}