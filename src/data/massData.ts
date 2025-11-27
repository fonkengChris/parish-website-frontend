export interface Dialogue {
  title: string;
  english: {
    priest: string;
    congregation: string;
  };
  latin: {
    priest: string;
    congregation: string;
  };
}

export interface Prayer {
  title: string;
  english: string;
  latin: string;
}

export const dialogues: Record<string, Dialogue> = {
  'Greeting': {
    title: 'Greeting',
    english: {
      priest: 'The Lord be with you.',
      congregation: 'And with your spirit.'
    },
    latin: {
      priest: 'Dominus vobiscum.',
      congregation: 'Et cum spiritu tuo.'
    }
  },
  'Penitential Act': {
    title: 'Penitential Act',
    english: {
      priest: 'To prepare ourselves to celebrate these sacred mysteries, let us call to mind our sins and ask God for forgiveness.',
      congregation: 'I confess to almighty God and to you, my brothers and sisters, that I have greatly sinned, in my thoughts and in my words, in what I have done and in what I have failed to do, through my fault, through my fault, through my most grievous fault; therefore I ask blessed Mary ever-Virgin, all the Angels and Saints, and you, my brothers and sisters, to pray for me to the Lord our God.',
    },
    latin: {
      priest: 'Confiteor Deo omnipotenti, et vobis, fratres, quia peccavi nimis cogitatione, verbo, opere et omissione: mea culpa, mea culpa, mea maxima culpa. Ideo precor beatam Mariam semper Virginem, omnes Angelos et Sanctos, et vos, fratres, orare pro me ad Dominum Deum nostrum.',
      congregation: 'Misereatur nostri omnipotens Deus et, dimissis peccatis nostris, perducat nos ad vitam aeternam.'
    }
  },
  'Gospel Acclamation': {
    title: 'Gospel Acclamation',
    english: {
      priest: 'A reading from the holy Gospel according to [Matthew/Mark/Luke/John].',
      congregation: 'Glory to you, O Lord. ... Praise to you, Lord Jesus Christ.'
    },
    latin: {
      priest: 'Lectio sancti Evangelii secundum [Matthaeum/Marcum/Lucam/Ioannem].',
      congregation: 'Gloria tibi, Domine. ... Laus tibi, Christe.'
    }
  },
  'Preface Dialogue': {
    title: 'Preface Dialogue',
    english: {
      priest: 'The Lord be with you. ... Lift up your hearts. ... Let us give thanks to the Lord our God.',
      congregation: 'And with your spirit. ... We lift them up to the Lord. ... It is right and just.'
    },
    latin: {
      priest: 'Dominus vobiscum. ... Sursum corda. ... Gratias agamus Domino Deo nostro.',
      congregation: 'Et cum spiritu tuo. ... Habemus ad Dominum. ... Dignum et iustum est.'
    }
  },
  'Memorial Acclamation': {
    title: 'Memorial Acclamation',
    english: {
      priest: 'The mystery of faith.',
      congregation: 'We proclaim your Death, O Lord, and profess your Resurrection until you come again. (or other acclamation)'
    },
    latin: {
      priest: 'Mysterium fidei.',
      congregation: 'Mortem tuam annuntiamus, Domine, et tuam resurrectionem confitemur, donec venias. (or other acclamation)'
    }
  },
  'Sign of Peace': {
    title: 'Sign of Peace',
    english: {
      priest: 'The peace of the Lord be with you always.',
      congregation: 'And with your spirit.'
    },
    latin: {
      priest: 'Pax Domini sit semper vobiscum.',
      congregation: 'Et cum spiritu tuo.'
    }
  },
  'Dismissal': {
    title: 'Dismissal',
    english: {
      priest: 'Go forth, the Mass is ended. (or other dismissal)',
      congregation: 'Thanks be to God.'
    },
    latin: {
      priest: 'Ite, missa est. (or other dismissal)',
      congregation: 'Deo gratias.'
    }
  }
};

export const prayers: Record<string, Prayer> = {
  'Kyrie': {
    title: 'Kyrie Eleison (Lord, have mercy)',
    english: 'Lord, have mercy. Christ, have mercy. Lord, have mercy.',
    latin: 'Kyrie, eleison. Christe, eleison. Kyrie, eleison.'
  },
  'Gloria': {
    title: 'Gloria (Glory to God)',
    english: 'Glory to God in the highest, and on earth peace to people of good will. We praise you, we bless you, we adore you, we glorify you, we give you thanks for your great glory, Lord God, heavenly King, O God, almighty Father. Lord Jesus Christ, Only Begotten Son, Lord God, Lamb of God, Son of the Father, you take away the sins of the world, have mercy on us; you take away the sins of the world, receive our prayer; you are seated at the right hand of the Father, have mercy on us. For you alone are the Holy One, you alone are the Lord, you alone are the Most High, Jesus Christ, with the Holy Spirit, in the glory of God the Father. Amen.',
    latin: 'Gloria in excelsis Deo et in terra pax hominibus bonae voluntatis. Laudamus te, benedicimus te, adoramus te, glorificamus te, gratias agimus tibi propter magnam gloriam tuam, Domine Deus, Rex caelestis, Deus Pater omnipotens. Domine Fili unigenite, Iesu Christe, Domine Deus, Agnus Dei, Filius Patris, qui tollis peccata mundi, miserere nobis; qui tollis peccata mundi, suscipe deprecationem nostram. Qui sedes ad dexteram Patris, miserere nobis. Quoniam tu solus Sanctus, tu solus Dominus, tu solus Altissimus, Iesu Christe, cum Sancto Spiritu in gloria Dei Patris. Amen.'
  },
  'Creed': {
    title: 'Nicene Creed',
    english: 'I believe in one God, the Father almighty, maker of heaven and earth, of all things visible and invisible. I believe in one Lord Jesus Christ, the Only Begotten Son of God, born of the Father before all ages. God from God, Light from Light, true God from true God, begotten, not made, consubstantial with the Father; through him all things were made. For us men and for our salvation he came down from heaven, and by the Holy Spirit was incarnate of the Virgin Mary, and became man. For our sake he was crucified under Pontius Pilate, he suffered death and was buried, and rose again on the third day in accordance with the Scriptures. He ascended into heaven and is seated at the right hand of the Father. He will come again in glory to judge the living and the dead and his kingdom will have no end. I believe in the Holy Spirit, the Lord, the giver of life, who proceeds from the Father and the Son, who with the Father and the Son is adored and glorified, who has spoken through the prophets. I believe in one, holy, catholic and apostolic Church. I confess one Baptism for the forgiveness of sins and I look forward to the resurrection of the dead and the life of the world to come. Amen.',
    latin: 'Credo in unum Deum, Patrem omnipotentem, factorem caeli et terrae, visibilium omnium et invisibilium. Et in unum Dominum Iesum Christum, Filium Dei unigenitum, et ex Patre natum ante omnia saecula. Deum de Deo, Lumen de Lumine, Deum verum de Deo vero, genitum non factum, consubstantialem Patri; per quem omnia facta sunt. Qui propter nos homines et propter nostram salutem descendit de caelis. Et incarnatus est de Spiritu Sancto ex Maria Virgine, et homo factus est. Crucifixus etiam pro nobis sub Pontio Pilato, passus et sepultus est, et resurrexit tertia die, secundum Scripturas, et ascendit in caelum, sedet ad dexteram Patris. Et iterum venturus est cum gloria, iudicare vivos et mortuos, cuius regni non erit finis. Et in Spiritum Sanctum, Dominum et vivificantem, qui ex Patre Filioque procedit. Qui cum Patre et Filio simul adoratur et conglorificatur: qui locutus est per prophetas. Et unam, sanctam, catholicam et apostolicam Ecclesiam. Confiteor unum baptisma in remissionem peccatorum. Et exspecto resurrectionem mortuorum, et vitam venturi saeculi. Amen.'
  },
  'Our Father': {
    title: 'Our Father (Lord\'s Prayer)',
    english: 'Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil.',
    latin: 'Pater noster, qui es in caelis, sanctificetur nomen tuum; adveniat regnum tuum; fiat voluntas tua, sicut in caelo et in terra. Panem nostrum cotidianum da nobis hodie; et dimitte nobis debita nostra, sicut et nos dimittimus debitoribus nostris; et ne nos inducas in tentationem, sed libera nos a malo.'
  },
  'Agnus Dei': {
    title: 'Agnus Dei (Lamb of God)',
    english: 'Lamb of God, you take away the sins of the world, have mercy on us. Lamb of God, you take away the sins of the world, have mercy on us. Lamb of God, you take away the sins of the world, grant us peace.',
    latin: 'Agnus Dei, qui tollis peccata mundi, miserere nobis. Agnus Dei, qui tollis peccata mundi, miserere nobis. Agnus Dei, qui tollis peccata mundi, dona nobis pacem.'
  },
  'Sanctus': {
    title: 'Sanctus (Holy, Holy, Holy)',
    english: 'Holy, Holy, Holy Lord God of hosts. Heaven and earth are full of your glory. Hosanna in the highest. Blessed is he who comes in the name of the Lord. Hosanna in the highest.',
    latin: 'Sanctus, Sanctus, Sanctus Dominus Deus Sabaoth. Pleni sunt caeli et terra gloria tua. Hosanna in excelsis. Benedictus qui venit in nomine Domini. Hosanna in excelsis.'
  },
  'Final Blessing': {
    title: 'Final Blessing',
    english: 'May almighty God bless you: the Father, and the Son, and the Holy Spirit. Amen.',
    latin: 'Benedicat vos omnipotens Deus, Pater, et Filius, et Spiritus Sanctus. Amen.'
  }
};

