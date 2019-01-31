export const SOCIAL_TO_ENUM = {
  facebook: 'Facebook',
  instagram: 'Instagram',
  twitter: 'Twitter',
  whatsapp: 'WhatsApp'
}

export const SOCIAL_ENUM = Object.values(SOCIAL_TO_ENUM)

export const SOCIAL_COLORS = {
  [SOCIAL_TO_ENUM.facebook]: '#3B5998',
  [SOCIAL_TO_ENUM.instagram]: '#3F729B',
  [SOCIAL_TO_ENUM.twitter]: '#00ACED',
  [SOCIAL_TO_ENUM.whatsapp]: '#25D366',
};

export const SOCIAL_ENUM_TO_ID = {
  [SOCIAL_TO_ENUM.facebook]: 'facebook',
  [SOCIAL_TO_ENUM.instagram]: 'instagram',
  [SOCIAL_TO_ENUM.twitter]: 'twitter',
  [SOCIAL_TO_ENUM.whatsapp]: 'whatsapp',
}

export const SOCIAL_ENUM_TO_COMPONENT = {
  [SOCIAL_TO_ENUM.facebook]: 'Facebook',
  [SOCIAL_TO_ENUM.instagram]: 'Instagram',
  [SOCIAL_TO_ENUM.twitter]: 'Twitter',
  [SOCIAL_TO_ENUM.whatsapp]: 'Whatsapp',
}
