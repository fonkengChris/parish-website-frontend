import { useState } from 'react';
import Layout from '../components/Layout';
import { dialogues, prayers } from '../data/massData';

export default function OrderOfTheMass() {
  const [expandedDialogues, setExpandedDialogues] = useState<Set<string>>(new Set());
  const [expandedPrayers, setExpandedPrayers] = useState<Set<string>>(new Set());

  const toggleDialogue = (title: string) => {
    const newExpanded = new Set(expandedDialogues);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedDialogues(newExpanded);
  };

  const togglePrayer = (title: string) => {
    const newExpanded = new Set(expandedPrayers);
    if (newExpanded.has(title)) {
      newExpanded.delete(title);
    } else {
      newExpanded.add(title);
    }
    setExpandedPrayers(newExpanded);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">Order of the Mass</h1>
          <p className="text-gray-600 text-lg">
            Learn about the structure and order of the Catholic Mass.
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Introductory Rites</h2>
            <ul className="space-y-3 text-gray-700 text-lg">
              <li className="flex items-start">
                <span className="text-primary-600 mr-3">1.</span>
                <span>Entrance Procession</span>
              </li>
              <li className="flex flex-col">
                <button
                  onClick={() => toggleDialogue('Greeting')}
                  className="flex items-center text-left hover:text-primary-600 transition-colors"
                >
                  <span className="text-primary-600 mr-3">2.</span>
                  <span className="flex-1">Greeting</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${expandedDialogues.has('Greeting') ? 'rotate-180' : ''}`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedDialogues.has('Greeting') && (
                  <div className="ml-8 mt-3 space-y-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">English</h4>
                      <div className="space-y-2 text-base">
                        <p><span className="font-medium text-primary-600">Priest:</span> {dialogues['Greeting'].english.priest}</p>
                        <p><span className="font-medium text-primary-600">Congregation:</span> {dialogues['Greeting'].english.congregation}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">Latin</h4>
                      <div className="space-y-2 text-base italic">
                        <p><span className="font-medium text-primary-600">Priest:</span> {dialogues['Greeting'].latin.priest}</p>
                        <p><span className="font-medium text-primary-600">Congregation:</span> {dialogues['Greeting'].latin.congregation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li className="flex flex-col">
                <button
                  onClick={() => toggleDialogue('Penitential Act')}
                  className="flex items-center text-left hover:text-primary-600 transition-colors"
                >
                  <span className="text-primary-600 mr-3">3.</span>
                  <span className="flex-1">Penitential Act</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${expandedDialogues.has('Penitential Act') ? 'rotate-180' : ''}`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedDialogues.has('Penitential Act') && (
                  <div className="ml-8 mt-3 space-y-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">English</h4>
                      <div className="space-y-2 text-base">
                        <p><span className="font-medium text-primary-600">Priest:</span> {dialogues['Penitential Act'].english.priest}</p>
                        <p><span className="font-medium text-primary-600">Congregation:</span> {dialogues['Penitential Act'].english.congregation}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">Latin</h4>
                      <div className="space-y-2 text-base italic">
                        <p><span className="font-medium text-primary-600">Priest:</span> {dialogues['Penitential Act'].latin.priest}</p>
                        <p><span className="font-medium text-primary-600">Congregation:</span> {dialogues['Penitential Act'].latin.congregation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li className="flex flex-col">
                <button
                  onClick={() => togglePrayer('Gloria')}
                  className="flex items-center text-left hover:text-primary-600 transition-colors"
                >
                  <span className="text-primary-600 mr-3">4.</span>
                  <span className="flex-1">Gloria (on Sundays and solemnities)</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${expandedPrayers.has('Gloria') ? 'rotate-180' : ''}`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedPrayers.has('Gloria') && (
                  <div className="ml-8 mt-3 space-y-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">English</h4>
                      <p className="text-base leading-relaxed">{prayers['Gloria'].english}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">Latin</h4>
                      <p className="text-base leading-relaxed italic">{prayers['Gloria'].latin}</p>
                    </div>
                  </div>
                )}
              </li>
              <li className="flex flex-col">
                <button
                  onClick={() => togglePrayer('Kyrie')}
                  className="flex items-center text-left hover:text-primary-600 transition-colors"
                >
                  <span className="text-primary-600 mr-3">5.</span>
                  <span className="flex-1">Kyrie Eleison (Lord, have mercy)</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${expandedPrayers.has('Kyrie') ? 'rotate-180' : ''}`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedPrayers.has('Kyrie') && (
                  <div className="ml-8 mt-3 space-y-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">English</h4>
                      <p className="text-base leading-relaxed">{prayers['Kyrie'].english}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">Latin</h4>
                      <p className="text-base leading-relaxed italic">{prayers['Kyrie'].latin}</p>
                    </div>
                  </div>
                )}
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-3">6.</span>
                <span>Collect (Opening Prayer)</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Liturgy of the Word</h2>
            <ul className="space-y-3 text-gray-700 text-lg">
              <li className="flex items-start">
                <span className="text-primary-600 mr-3">1.</span>
                <span>First Reading (usually from the Old Testament)</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-3">2.</span>
                <span>Responsorial Psalm</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-3">3.</span>
                <span>Second Reading (usually from the New Testament, on Sundays and solemnities)</span>
              </li>
              <li className="flex flex-col">
                <button
                  onClick={() => toggleDialogue('Gospel Acclamation')}
                  className="flex items-center text-left hover:text-primary-600 transition-colors"
                >
                  <span className="text-primary-600 mr-3">4.</span>
                  <span className="flex-1">Gospel Acclamation (Alleluia)</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${expandedDialogues.has('Gospel Acclamation') ? 'rotate-180' : ''}`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedDialogues.has('Gospel Acclamation') && (
                  <div className="ml-8 mt-3 space-y-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">English</h4>
                      <div className="space-y-2 text-base">
                        <p><span className="font-medium text-primary-600">Priest:</span> {dialogues['Gospel Acclamation'].english.priest}</p>
                        <p><span className="font-medium text-primary-600">Congregation:</span> {dialogues['Gospel Acclamation'].english.congregation}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">Latin</h4>
                      <div className="space-y-2 text-base italic">
                        <p><span className="font-medium text-primary-600">Priest:</span> {dialogues['Gospel Acclamation'].latin.priest}</p>
                        <p><span className="font-medium text-primary-600">Congregation:</span> {dialogues['Gospel Acclamation'].latin.congregation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-3">5.</span>
                <span>Gospel Reading</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-3">6.</span>
                <span>Homily</span>
              </li>
              <li className="flex flex-col">
                <button
                  onClick={() => togglePrayer('Creed')}
                  className="flex items-center text-left hover:text-primary-600 transition-colors"
                >
                  <span className="text-primary-600 mr-3">7.</span>
                  <span className="flex-1">Profession of Faith (Creed) - on Sundays and solemnities</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${expandedPrayers.has('Creed') ? 'rotate-180' : ''}`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedPrayers.has('Creed') && (
                  <div className="ml-8 mt-3 space-y-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">English</h4>
                      <p className="text-base leading-relaxed">{prayers['Creed'].english}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">Latin</h4>
                      <p className="text-base leading-relaxed italic">{prayers['Creed'].latin}</p>
                    </div>
                  </div>
                )}
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-3">8.</span>
                <span>Prayer of the Faithful</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Liturgy of the Eucharist</h2>
            <ul className="space-y-3 text-gray-700 text-lg">
              <li className="flex items-start">
                <span className="text-primary-600 mr-3">1.</span>
                <span>Preparation of the Altar and Gifts</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-3">2.</span>
                <span>Prayer over the Offerings</span>
              </li>
              <li className="flex flex-col">
                <button
                  onClick={() => toggleDialogue('Preface Dialogue')}
                  className="flex items-center text-left hover:text-primary-600 transition-colors"
                >
                  <span className="text-primary-600 mr-3">3.</span>
                  <span className="flex-1">Eucharistic Prayer (Preface Dialogue)</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${expandedDialogues.has('Preface Dialogue') ? 'rotate-180' : ''}`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedDialogues.has('Preface Dialogue') && (
                  <div className="ml-8 mt-3 space-y-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">English</h4>
                      <div className="space-y-2 text-base">
                        <p><span className="font-medium text-primary-600">Priest:</span> {dialogues['Preface Dialogue'].english.priest}</p>
                        <p><span className="font-medium text-primary-600">Congregation:</span> {dialogues['Preface Dialogue'].english.congregation}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">Latin</h4>
                      <div className="space-y-2 text-base italic">
                        <p><span className="font-medium text-primary-600">Priest:</span> {dialogues['Preface Dialogue'].latin.priest}</p>
                        <p><span className="font-medium text-primary-600">Congregation:</span> {dialogues['Preface Dialogue'].latin.congregation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li className="flex flex-col">
                <button
                  onClick={() => togglePrayer('Sanctus')}
                  className="flex items-center text-left hover:text-primary-600 transition-colors"
                >
                  <span className="text-primary-600 mr-3">4.</span>
                  <span className="flex-1">Sanctus (Holy, Holy, Holy)</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${expandedPrayers.has('Sanctus') ? 'rotate-180' : ''}`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedPrayers.has('Sanctus') && (
                  <div className="ml-8 mt-3 space-y-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">English</h4>
                      <p className="text-base leading-relaxed">{prayers['Sanctus'].english}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">Latin</h4>
                      <p className="text-base leading-relaxed italic">{prayers['Sanctus'].latin}</p>
                    </div>
                  </div>
                )}
              </li>
              <li className="flex flex-col">
                <button
                  onClick={() => toggleDialogue('Memorial Acclamation')}
                  className="flex items-center text-left hover:text-primary-600 transition-colors"
                >
                  <span className="text-primary-600 mr-3">5.</span>
                  <span className="flex-1">Memorial Acclamation</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${expandedDialogues.has('Memorial Acclamation') ? 'rotate-180' : ''}`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedDialogues.has('Memorial Acclamation') && (
                  <div className="ml-8 mt-3 space-y-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">English</h4>
                      <div className="space-y-2 text-base">
                        <p><span className="font-medium text-primary-600">Priest:</span> {dialogues['Memorial Acclamation'].english.priest}</p>
                        <p><span className="font-medium text-primary-600">Congregation:</span> {dialogues['Memorial Acclamation'].english.congregation}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">Latin</h4>
                      <div className="space-y-2 text-base italic">
                        <p><span className="font-medium text-primary-600">Priest:</span> {dialogues['Memorial Acclamation'].latin.priest}</p>
                        <p><span className="font-medium text-primary-600">Congregation:</span> {dialogues['Memorial Acclamation'].latin.congregation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li className="flex flex-col">
                <button
                  onClick={() => togglePrayer('Our Father')}
                  className="flex items-center text-left hover:text-primary-600 transition-colors"
                >
                  <span className="text-primary-600 mr-3">6.</span>
                  <span className="flex-1">Lord's Prayer (Our Father)</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${expandedPrayers.has('Our Father') ? 'rotate-180' : ''}`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedPrayers.has('Our Father') && (
                  <div className="ml-8 mt-3 space-y-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">English</h4>
                      <p className="text-base leading-relaxed">{prayers['Our Father'].english}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">Latin</h4>
                      <p className="text-base leading-relaxed italic">{prayers['Our Father'].latin}</p>
                    </div>
                  </div>
                )}
              </li>
              <li className="flex flex-col">
                <button
                  onClick={() => toggleDialogue('Sign of Peace')}
                  className="flex items-center text-left hover:text-primary-600 transition-colors"
                >
                  <span className="text-primary-600 mr-3">7.</span>
                  <span className="flex-1">Sign of Peace</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${expandedDialogues.has('Sign of Peace') ? 'rotate-180' : ''}`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedDialogues.has('Sign of Peace') && (
                  <div className="ml-8 mt-3 space-y-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">English</h4>
                      <div className="space-y-2 text-base">
                        <p><span className="font-medium text-primary-600">Priest:</span> {dialogues['Sign of Peace'].english.priest}</p>
                        <p><span className="font-medium text-primary-600">Congregation:</span> {dialogues['Sign of Peace'].english.congregation}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">Latin</h4>
                      <div className="space-y-2 text-base italic">
                        <p><span className="font-medium text-primary-600">Priest:</span> {dialogues['Sign of Peace'].latin.priest}</p>
                        <p><span className="font-medium text-primary-600">Congregation:</span> {dialogues['Sign of Peace'].latin.congregation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li className="flex flex-col">
                <button
                  onClick={() => togglePrayer('Agnus Dei')}
                  className="flex items-center text-left hover:text-primary-600 transition-colors"
                >
                  <span className="text-primary-600 mr-3">8.</span>
                  <span className="flex-1">Agnus Dei (Lamb of God)</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${expandedPrayers.has('Agnus Dei') ? 'rotate-180' : ''}`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedPrayers.has('Agnus Dei') && (
                  <div className="ml-8 mt-3 space-y-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">English</h4>
                      <p className="text-base leading-relaxed">{prayers['Agnus Dei'].english}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">Latin</h4>
                      <p className="text-base leading-relaxed italic">{prayers['Agnus Dei'].latin}</p>
                    </div>
                  </div>
                )}
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-3">9.</span>
                <span>Breaking of the Bread</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-3">10.</span>
                <span>Reception of Communion</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-3">11.</span>
                <span>Prayer after Communion</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Concluding Rites</h2>
            <ul className="space-y-3 text-gray-700 text-lg">
              <li className="flex flex-col">
                <button
                  onClick={() => togglePrayer('Final Blessing')}
                  className="flex items-center text-left hover:text-primary-600 transition-colors"
                >
                  <span className="text-primary-600 mr-3">1.</span>
                  <span className="flex-1">Final Blessing</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${expandedPrayers.has('Final Blessing') ? 'rotate-180' : ''}`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedPrayers.has('Final Blessing') && (
                  <div className="ml-8 mt-3 space-y-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">English</h4>
                      <p className="text-base leading-relaxed">{prayers['Final Blessing'].english}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">Latin</h4>
                      <p className="text-base leading-relaxed italic">{prayers['Final Blessing'].latin}</p>
                    </div>
                  </div>
                )}
              </li>
              <li className="flex flex-col">
                <button
                  onClick={() => toggleDialogue('Dismissal')}
                  className="flex items-center text-left hover:text-primary-600 transition-colors"
                >
                  <span className="text-primary-600 mr-3">2.</span>
                  <span className="flex-1">Dismissal</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${expandedDialogues.has('Dismissal') ? 'rotate-180' : ''}`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {expandedDialogues.has('Dismissal') && (
                  <div className="ml-8 mt-3 space-y-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">English</h4>
                      <div className="space-y-2 text-base">
                        <p><span className="font-medium text-primary-600">Priest:</span> {dialogues['Dismissal'].english.priest}</p>
                        <p><span className="font-medium text-primary-600">Congregation:</span> {dialogues['Dismissal'].english.congregation}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-700 mb-2">Latin</h4>
                      <div className="space-y-2 text-base italic">
                        <p><span className="font-medium text-primary-600">Priest:</span> {dialogues['Dismissal'].latin.priest}</p>
                        <p><span className="font-medium text-primary-600">Congregation:</span> {dialogues['Dismissal'].latin.congregation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-3">3.</span>
                <span>Recessional</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

