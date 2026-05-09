export type IndustryId = 'aerospace' | 'pharma' | 'energy' | 'manufacturing' | 'fintech';

export type CampaignStatus = 'sent' | 'clicked' | 'reported';

export type IndicatorTarget = 'sender' | 'subject' | 'urgency' | 'cta' | 'data' | 'domain' | 'tone';

export interface Indicator {
  target: IndicatorTarget;
  text: string;
}

export interface QuizQuestion {
  question: string;
  a: string;
  b: string;
  c: string;
  correct: 'a' | 'b' | 'c';
}

export interface Scenario {
  meta: {
    sender_name: string;
    sender_email: string;
    subject: string;
  };
  body_paragraphs: string[];
  data_table: Array<{ label: string; value: string }>;
  cta: {
    text: string;
    color: 'red' | 'orange' | 'blue';
  };
  indicators: Indicator[];
  education_text: string;
  quiz: QuizQuestion[];
}

export interface Campaign {
  id: string;
  created_at: string;
  industry: IndustryId;
  role: string;
  scenario_json: Scenario;
  token: string;
  clicked_at: string | null;
  reported_at: string | null;
  status: CampaignStatus;
}

export type StreamEvent =
  | { type: 'meta'; payload: Scenario['meta'] }
  | { type: 'paragraph'; payload: string }
  | { type: 'data_row'; payload: { label: string; value: string } }
  | { type: 'cta'; payload: Scenario['cta'] }
  | { type: 'indicator'; payload: Indicator }
  | { type: 'education'; payload: string }
  | { type: 'quiz'; payload: QuizQuestion }
  | { type: 'done'; payload: { token: string } }
  | { type: 'error'; payload: string };

export interface IndustryConfig {
  id: IndustryId;
  label: string;
  iconName: string;
  primaryColor: string;
  accentColor: string;
  roles: Array<{
    id: string;
    label: string;
    description: string;
    emotionalProfile: string;
  }>;
  vocabulary: string[];
  polishEmployers: string[];
  fictionalSenders: Array<{
    name: string;
    domain: string;
  }>;
  commonScenarios: string[];
}
