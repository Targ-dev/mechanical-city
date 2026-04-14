import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IFeature {
    title: string;
    description: string;
    iconSvg: string;
}

export interface IBanner {
    bannerId: string;
    imageUrl: string;
    subtitle: string;
    titleHtml: string;
    buttonText: string;
    buttonLink: string;
}

export interface ISiteConfig extends Document {
    singletonId: string;
    contactEmail: string;
    contactPhone: string;
    contactAddress: string;
    socialInstagram: string;
    socialFacebook: string;
    socialWhatsapp: string;
    footerAboutText: string;
    features: IFeature[];
    banners: IBanner[];
    createdAt: Date;
    updatedAt: Date;
}

const FeatureSchema = new Schema<IFeature>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconSvg: { type: String, required: true },
});

const BannerSchema = new Schema<IBanner>({
    bannerId: { type: String, required: true },
    imageUrl: { type: String, required: true },
    subtitle: { type: String, required: true },
    titleHtml: { type: String, required: true },
    buttonText: { type: String, required: true },
    buttonLink: { type: String, required: true },
});

const SiteConfigSchema: Schema = new Schema(
    {
        singletonId: { type: String, default: 'global', unique: true },
        contactEmail: { type: String, default: 'support@mechanicalcity.com' },
        contactPhone: { type: String, default: '(+91) 987 654 3210' },
        contactAddress: { type: String, default: '121 King Street, Collins Melbourne\nWest Victoria 8007, Australia.' },
        socialInstagram: { type: String, default: '#' },
        socialFacebook: { type: String, default: '#' },
        socialWhatsapp: { type: String, default: '#' },
        footerAboutText: { type: String, default: 'Excellent service and high-quality power tools! They performed flawlessly and gave me peace of mind throughout my projects. Highly professional.' },
        features: { type: [FeatureSchema], default: [] },
        banners: { type: [BannerSchema], default: [] },
    },
    {
        timestamps: true,
    }
);

if (process.env.NODE_ENV === 'development') {
    if (mongoose.models.SiteConfig) {
        delete mongoose.models.SiteConfig;
    }
}

const SiteConfig: Model<ISiteConfig> = mongoose.models.SiteConfig || mongoose.model<ISiteConfig>('SiteConfig', SiteConfigSchema);

export default SiteConfig;
