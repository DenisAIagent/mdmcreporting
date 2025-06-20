import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Search, 
  Download,
  Target,
  Clock
} from 'lucide-react';

interface Example {
  category: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  query: string;
  badge?: string;
}

interface ChatExamplesProps {
  onExampleClick: (query: string) => void;
}

const examples: Example[] = [
  {
    category: "Analyses Rapides",
    icon: <BarChart3 className="h-4 w-4" />,
    title: "Top Campagnes du Mois",
    description: "Voir les campagnes les plus performantes",
    query: "Montre-moi les 10 meilleures campagnes de ce mois triées par conversions",
    badge: "Populaire"
  },
  {
    category: "Analyses Temporelles",
    icon: <TrendingUp className="h-4 w-4" />,
    title: "Évolution Trimestrielle",
    description: "Analyse de tendance sur 3 mois",
    query: "Évolution du ROAS et des conversions sur les 3 derniers mois",
    badge: "Tendance"
  },
  {
    category: "Mots-clés",
    icon: <Search className="h-4 w-4" />,
    title: "Mots-clés Performants",
    description: "Identifier les meilleurs termes",
    query: "Analyse des mots-clés les plus performants ce trimestre avec CTR > 5%"
  },
  {
    category: "Exports",
    icon: <FileText className="h-4 w-4" />,
    title: "Rapport PDF Mensuel",
    description: "Export professionnel formaté",
    query: "Génère un rapport PDF des performances du mois dernier avec graphiques",
    badge: "Export"
  },
  {
    category: "Analyses Temporelles",
    icon: <Calendar className="h-4 w-4" />,
    title: "Historique 18 Mois",
    description: "Vue d'ensemble long terme",
    query: "Campagnes sur les 18 derniers mois triées par ROAS, export Excel"
  },
  {
    category: "Optimisation",
    icon: <Target className="h-4 w-4" />,
    title: "Campagnes Sous-performantes",
    description: "Identifier les opportunités",
    query: "Campagnes avec ROAS < 3 et budget épuisé avant 80% du mois"
  },
  {
    category: "Comparaisons",
    icon: <Clock className="h-4 w-4" />,
    title: "Mobile vs Desktop",
    description: "Performance par appareil",
    query: "Comparaison des performances mobile vs desktop ce trimestre"
  },
  {
    category: "Exports",
    icon: <Download className="h-4 w-4" />,
    title: "Export Données Brutes",
    description: "Données complètes en CSV",
    query: "Export CSV de toutes les métriques des campagnes actives"
  }
];

const ChatExamples: React.FC<ChatExamplesProps> = ({ onExampleClick }) => {
  const categories = [...new Set(examples.map(e => e.category))];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-[var(--mdmc-black)] mb-2">
          💡 Exemples de Requêtes IA
        </h3>
        <p className="text-sm text-[var(--mdmc-gray-600)]">
          Cliquez sur un exemple pour l'essayer ou inspirez-vous pour vos propres requêtes
        </p>
      </div>

      {categories.map(category => (
        <div key={category} className="space-y-3">
          <h4 className="font-medium text-[var(--mdmc-red)] text-sm uppercase tracking-wide">
            {category}
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {examples
              .filter(example => example.category === category)
              .map((example, index) => (
                <Card 
                  key={index}
                  className="card-mdmc-hover cursor-pointer transition-all duration-200"
                  onClick={() => onExampleClick(example.query)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="text-[var(--mdmc-red)]">
                          {example.icon}
                        </div>
                        <h5 className="font-medium text-[var(--mdmc-black)] text-sm">
                          {example.title}
                        </h5>
                      </div>
                      {example.badge && (
                        <Badge className="badge-info text-xs">
                          {example.badge}
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-xs text-[var(--mdmc-gray-600)] mb-3">
                      {example.description}
                    </p>
                    
                    <div className="bg-[var(--mdmc-gray-50)] rounded-lg p-2">
                      <p className="text-xs font-mono text-[var(--mdmc-gray-700)]">
                        "{example.query}"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      ))}

      <div className="mt-6 p-4 bg-gradient-mdmc-subtle rounded-lg border border-[var(--mdmc-gray-200)]">
        <h4 className="font-medium text-[var(--mdmc-black)] mb-2 flex items-center">
          <Target className="h-4 w-4 text-[var(--mdmc-red)] mr-2" />
          Conseils pour de Meilleures Requêtes
        </h4>
        <ul className="text-sm text-[var(--mdmc-gray-600)] space-y-1">
          <li>• <strong>Soyez spécifique</strong> : "campagnes e-commerce" plutôt que "campagnes"</li>
          <li>• <strong>Précisez la période</strong> : "30 derniers jours", "ce trimestre", "18 mois"</li>
          <li>• <strong>Mentionnez le format</strong> : "export PDF", "données Excel", "graphique"</li>
          <li>• <strong>Utilisez les métriques</strong> : ROAS, CTR, CPC, conversions, impressions</li>
        </ul>
      </div>
    </div>
  );
};

export default ChatExamples;
