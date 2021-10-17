const profanityList = [
  'arse',
  'ass',
  'asshole',
  'bastard',
  'bullshit',
  'crap',
  'damn',
  'frigger',
  'bloody',
  'bugger',
  'crap',
  'damn',
  'goddam',
  'minger',
  'bint',
  'bitch',
  'bollocks',
  'bullshit',
  'feck',
  'munter',
  'piss',
  'shit',
  'son of a bitch',
  'tits',
  'bellend',
  'bloodclaat',
  'clunge',
  'cock',
  'dick',
  'dickhead',
  'prick',
  'punani',
  'pussy',
  'snatch',
  'twat',
  'cunt',
  'fuck',
  'motherfucker'
]

function checkProfanity(content) {
  const lowerCaseContent = content.toLowerCase();
  const foundProfanity = profanityList.filter(word => lowerCaseContent.includes(word));
  return foundProfanity.length ? true : false;
}

export {
  checkProfanity
}
  