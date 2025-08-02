'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const InformationSection: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="card mt-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 leading-tight">
          Как английский язык влияет на мышление
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-brand-primary to-brand-secondary mx-auto rounded-full mb-6"></div>
      </div>
      
      <div className="flex justify-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-brand-primary hover:text-brand-secondary transition-colors cursor-pointer"
        >
          {!isExpanded ? (
            <>
              <span className="text-base">Читать</span>
              <ChevronDown size={18} className="text-brand-primary" />
            </>
          ) : null}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-6">
          <p className="text-gray-700 leading-relaxed">
            Прежде чем начинать учить английский, важно понять, в чём корень различий между нашими языками и как это влияет на мышление.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="text-2xl">⚡</div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Прямолинейность и краткость</h4>
                <p className="text-gray-700 leading-relaxed">
                  Английский язык по структуре и традиции — более прямой и лаконичный. В деловой и повседневной речи англоговорящие чаще выражают мысли коротко и по существу, избегая сложных оборотов и намёков.
                </p>
              </div>
            </div>

            <hr className="divider-solid" />

            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="text-2xl">🤝</div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Вежливость через грамматику</h4>
                <p className="text-gray-700 leading-relaxed">
                  В английском много &quot;смягчающих&quot; конструкций: &quot;Could you...?&quot;, &quot;Would you mind...?&quot;, &quot;I was wondering if...&quot;. Это формирует привычку выражаться вежливо даже при просьбах и отказах.
                </p>
              </div>
            </div>

            <hr className="divider-solid" />

            <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <div className="text-2xl">🎯</div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Акцент на действия</h4>
                <p className="text-gray-700 leading-relaxed">
                  В английском предложения чаще строятся вокруг действия (глагола), тогда как в русском можно сделать акцент на состоянии или описании.
                </p>
              </div>
            </div>

            <hr className="divider-solid" />

            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <div className="text-2xl">👤</div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Индивидуализм в языке</h4>
                <p className="text-gray-700 leading-relaxed">
                  В английском нет грамматического &quot;вы&quot; для уважения — только &quot;you&quot; для всех. Это отражает идею равенства и индивидуализма в культуре.
                </p>
              </div>
            </div>

            <hr className="divider-solid" />

            <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <div className="text-2xl">📋</div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Чёткие правила</h4>
                <p className="text-gray-700 leading-relaxed">
                  Жёсткий порядок слов в английском помогает мыслить структурно: кто, что делает, с кем и когда. Русский позволяет &quot;играть&quot; со словами, делать речь более образной, но и более многозначной.
                </p>
              </div>
            </div>

            <hr className="divider-solid" />

            <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
              <div className="text-2xl">⚡</div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Быстрота на реакции</h4>
                <p className="text-gray-700 leading-relaxed">
                  Английский побуждает быстрее реагировать, принимать решения и действовать — поэтому типичен стиль &quot;Act first, think later&quot;, особенно в бизнесе.
                </p>
              </div>
            </div>

            <hr className="divider-solid" />

            <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
              <div className="text-2xl">🌱</div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Открытость к новым идеям</h4>
                <p className="text-gray-700 leading-relaxed">
                  Английский язык легко &quot;впитывает&quot; новые слова и понятия, что способствует открытости мышления, готовности к инновациям и переменам.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg text-black">
            <h4 className="font-semibold mb-2">Ключевой вывод</h4>
            <p className="leading-relaxed">
              Язык — это не просто средство общения, а &quot;очки&quot;, через которые мы смотрим на мир.
            </p>
            <p className="leading-relaxed mt-2">
              Осваивая английский, люди часто становятся более открытыми, уверенными, склонными к сотрудничеству, быстро учатся адаптироваться к переменам и выражать мысли ясно и доброжелательно.
            </p>
          </div>

          {/* Hide button at the bottom */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => setIsExpanded(false)}
              className="flex items-center gap-2 text-brand-primary hover:text-brand-secondary transition-colors cursor-pointer"
            >
              <span className="text-base">Скрыть</span>
              <ChevronUp size={18} className="text-brand-primary" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InformationSection; 