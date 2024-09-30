"use client";

import { useState, useEffect, useCallback } from 'react';
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Moon, Sun } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";

// Tax rates for USD to ARS conversion
const IVA_TAX = 0.21;
const PAIS_TAX = 0.08;
const EARNINGS_TAX = 0.30;
const IIBB_TAX = 0.02;

const subscriptionCategories = [
    {
      name: "Streaming",
      subscriptions: [
        { name: 'Netflix', price: 9.99 },
        { name: 'MUBI', price: 10.99 },
        { name: 'MAX (HBO Max)', price: 15.99 },
        { name: 'Prime Video', price: 8.99 },
        { name: 'Disney Plus', price: 7.99 },
        { name: 'Paramount+', price: 4.99 },
        { name: 'Crunchyroll', price: 7.99 },
        { name: 'Apple TV', price: 6.99 },
        { name: 'YouTube Premium', price: 11.99 },
        { name: 'Twitch', price: 1.99 },
        { name: 'Kick', price: 4.99 },
        { name: 'ViX Premium (US)', price: 6.99 },
        { name: 'Rakuten Viki', price: 4.99 },
        { name: 'CINE FAN Black', price: 11.00 },
        { name: 'Plex Pass', price: 4.99 },
        { name: 'Pornhub', price: 9.99 },
        { name: 'Brazzers', price: 29.99 },
      ]
    },
    {
      name: "Music",
      subscriptions: [
        { name: 'Spotify', price: 9.99 },
        { name: 'YouTube Music', price: 9.99 },
        { name: 'Amazon Music', price: 8.99 },
        { name: 'Apple Music', price: 9.99 },
        { name: 'Tidal', price: 9.99 },
        { name: 'Deezer', price: 10.99 },
      ]
    },
    {
      name: "Gaming",
      subscriptions: [
        { name: 'Xbox Game Pass', price: 14.99 },
        { name: 'PlayStation Plus', price: 9.99 },
        { name: 'Nintendo Switch Online', price: 3.99 },
        { name: 'EA Play (PC)', price: 4.99 },
        { name: 'Ubisoft+', price: 14.99 },
        { name: 'GeForce Now / ABYA', price: 9.99 },
        { name: 'Apple Arcade', price: 4.99 },
        { name: 'World of Warcraft', price: 14.99 },
        { name: 'Minecraft Realms', price: 7.99 },
        { name: 'Final Fantasy XIV', price: 12.99 },
        { name: 'Chess.com', price: 6.99 },
        { name: 'Geoguessr', price: 4.99 },
        { name: 'ExitLag', price: 6.50 },
        { name: 'Just Dance Now VIP', price: 4.99 },
        { name: 'iRacing', price: 13.00 },
      ]
    },
    { name: "Creditos para jueguitos",
      subscriptions: [
        { name: 'Fortnite (paVos)', price: 0.00 },
        { name: 'EA SPORTS FC 24 (FIFA)', price: 0.00 },
        { name: 'EA SPORTS FC 24 (FIFA) Mobile', price: 0.00 },
        { name: 'Valorant Points', price: 0.00 },
        { name: 'Call of Duty Points', price: 0.00 },
        { name: 'Call of Duty Points (Mobile)', price: 0.00 },
        { name: 'Roblox', price: 0.00 },
        { name: 'Genshin Impact', price: 0.00 },
        { name: 'League of Legends (RP)', price: 0.00 },
        { name: 'Wild Cores (LoL)', price: 0.00 },
        { name: 'War Thunder Mobile', price: 0.00 },
        { name: 'PUBG G-Coins', price: 0.00 },
        { name: 'Rainbow Six Siege', price: 0.00 },
        { name: 'Shapegrid', price: 0.00 },
        { name: 'Rocket League', price: 0.00 },
        { name: 'Halo Infinite', price: 0.00 },
        { name: 'Freefire', price: 0.00 },
        { name: 'Brawl Stars', price: 0.00 },
        { name: 'Clash Royale', price: 0.00 },
        { name: 'Clash of Clans', price: 0.00 },
        { name: 'Hay Day', price: 0.00 },
      ]
    },
    {
      name: "Sports",
      subscriptions: [
        { name: 'NBA League Pass', price: 14.99 },
        { name: 'NFL Game Pass', price: 9.99 },
        { name: 'TrillerTV+ (FITE)', price: 7.99 },
        { name: 'WWE Network', price: 9.99 },
        { name: 'UFC Fight Pass', price: 9.99 },
        { name: 'F1 TV', price: 9.99 },
      ]
    },
    {
      name: "Development",
      subscriptions: [
        { name: 'GitHub Copilot', price: 10.00 },
        { name: 'Vercel', price: 20.00 },
        { name: 'JetBrains (personal)', price: 16.90 },
        { name: 'JetBrains (empresas)', price: 46.92 },
        { name: 'Webflow', price: 16.00 },
        { name: 'Bubble.io', price: 25.00 },
        { name: 'Supabase', price: 25.00 },
        { name: 'RunJS', price: 5.00 },
      ]
    },
    {
      name: "Productivity",
      subscriptions: [
        { name: 'Clipchamp', price: 9.99 },
        { name: 'Adobe Creative Cloud', price: 52.99 },
        { name: 'Figma', price: 12.00 },
        { name: 'FigJam', price: 3.00 },
        { name: 'Midjourney', price: 10.00 },
        { name: 'Framer', price: 20.00 },
        { name: 'Canva', price: 12.99 },
        { name: 'Picsart', price: 4.99 },
        { name: 'Microsoft 365', price: 6.99 },
        { name: 'LinkedIn Premium', price: 29.99 },
        { name: 'Zoom', price: 14.99 },
        { name: 'ChatGPT Plus (Open AI)', price: 20.00 },
        { name: 'Streamlabs', price: 19.00 },
        { name: 'IFTTT', price: 5.00 },
        { name: 'Notion', price: 8.00 },
        { name: 'Trading View', price: 14.95 },
        { name: 'Starlink', price: 110.00 },
        { name: 'Obsidian', price: 10.00 },
      ]
    },
    {
      name: "Storage",
      subscriptions: [
        { name: 'Google One', price: 1.99 },
        { name: 'Dropbox', price: 11.99 },
        { name: 'One Drive', price: 1.99 },
        { name: 'iCloud', price: 0.99 },
        { name: 'Apple One', price: 16.95 },
        { name: 'Yandex 360', price: 2.49 },
      ]
    },
    {
      name: "Security",
      subscriptions: [
        { name: '1Password', price: 2.99 },
        { name: 'Bitwarden', price: 10.00 },
        { name: 'NordVPN', price: 11.99 },
        { name: 'Surfshark VPN', price: 12.95 },
        { name: 'Express VPN', price: 12.95 },
        { name: 'TunnelBear VPN', price: 9.99 },
        { name: 'Kaspersky', price: 29.99 },
        { name: 'Norton', price: 19.99 },
        { name: 'AVG', price: 4.19 },
        { name: 'Avast', price: 3.99 },
        { name: 'Proton', price: 9.99 },
      ]
    },
    {
      name: "Social",
      subscriptions: [
        { name: 'Discord', price: 9.99 },
        { name: 'X (Twitter)', price: 8.00 },
        { name: 'Telegram', price: 4.99 },
        { name: 'Meta Verified', price: 11.99 },
        { name: 'Slack', price: 6.67 },
      ]
    },
    {
      name: "Education",
      subscriptions: [
        { name: 'Kindle Unlimited', price: 9.99 },
        { name: 'Amazon Audible', price: 14.95 },
        { name: 'Duolingo', price: 6.99 },
        { name: 'Busuu', price: 9.99 },
        { name: 'mimo', price: 9.99 },
      ]
    },
    {
      name: "Other",
      subscriptions: [
        { name: 'Mercado Libre', price: 4.00 },
      ]
    }
  ];

// API configuration
const API_KEY = '87c53620b61a8a85f3232a88';
const EXTERNAL_API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

const currencyFlags: { [key: string]: string } = {
  USD: '🇺🇸',
  EUR: '🇪🇺',
  GBP: '🇬🇧',
  JPY: '🇯🇵',
  ARS: '🇦🇷',
  // Añade más banderas según sea necesario
};
export default function CurrencyConverter() {
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>({});
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('ARS');
  const [convertedAmount, setConvertedAmount] = useState('');
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>([]);
  const [totalOriginal, setTotalOriginal] = useState(0);
  const [totalConverted, setTotalConverted] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [taxBreakdown, setTaxBreakdown] = useState<{ [key: string]: number }>({});
  const [openCategories, setOpenCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(EXTERNAL_API_URL);
        const data = await response.json();
        setExchangeRates(data.conversion_rates);
      } catch (error) {
        console.error('Error al obtener tasas de cambio:', error);
      }
    };
    fetchExchangeRates();
  }, []);

  const convertCurrency = useCallback(() => {
    const fromRate = exchangeRates[fromCurrency] || 1;
    const toRate = exchangeRates[toCurrency] || 1;

    const subscriptionTotal = selectedSubscriptions.reduce((total, subName) => {
      const subscription = subscriptionCategories
        .flatMap(category => category.subscriptions)
        .find(sub => sub.name === subName);
      return total + (subscription?.price || 0);
    }, 0);

    const totalInUSD = (parseFloat(amount) || 0) + subscriptionTotal;
    const converted = (totalInUSD / fromRate) * toRate;

    if (fromCurrency === 'USD' && toCurrency === 'ARS') {
      const baseAmount = converted;
      const iva = baseAmount * IVA_TAX;
      const pais = baseAmount * PAIS_TAX;
      const ganancias = baseAmount * EARNINGS_TAX;
      const iibb = baseAmount * IIBB_TAX;

      const totalWithTaxes = baseAmount + iva + pais + ganancias + iibb;

      setConvertedAmount(totalWithTaxes.toFixed(2));
      setTotalOriginal(totalInUSD);
      setTotalConverted(totalWithTaxes);
      setTaxBreakdown({
        baseAmount: baseAmount,
        iva: iva,
        pais: pais,
        ganancias: ganancias,
        iibb: iibb,
        total: totalWithTaxes
      });
    } else {
      setConvertedAmount(converted.toFixed(2));
      setTotalOriginal(totalInUSD);
      setTotalConverted(converted);
      setTaxBreakdown({});
    }
  }, [amount, fromCurrency, toCurrency, selectedSubscriptions, exchangeRates]);

  useEffect(() => {
    convertCurrency();
  }, [convertCurrency]);

  const handleSubscriptionToggle = (subName: string) => {
    setSelectedSubscriptions(prev =>
      prev.includes(subName)
        ? prev.filter(name => name !== subName)
        : [...prev, subName]
    );
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const getConvertedPrice = (price: number) => {
    const fromRate = exchangeRates[fromCurrency] || 1;
    const toRate = exchangeRates[toCurrency] || 1;
    return ((price / fromRate) * toRate).toFixed(2);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      <Card className="w-full lg:w-2/3 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Conversor de Monedas Mejorado</CardTitle>
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
              aria-label="Alternar modo oscuro"
            />
            <Moon className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fromCurrency">De</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger id="fromCurrency">
                  <SelectValue placeholder="Seleccionar moneda" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(exchangeRates).map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currencyFlags[currency]} {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="toCurrency">A</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger id="toCurrency">
                  <SelectValue placeholder="Seleccionar moneda" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(exchangeRates).map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currencyFlags[currency]} {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Cantidad</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAmount(e.target.value)}
              placeholder="Ingrese cantidad"
            />
          </div>
          <div className="space-y-2">
            <Label>Cantidad Convertida</Label>
            <Input value={convertedAmount} readOnly />
          </div>
          {fromCurrency === 'USD' && toCurrency === 'ARS' && taxBreakdown.baseAmount && (
            <div className="space-y-2 text-sm">
              <p>Desglose de Impuestos:</p>
              <p>Monto Base: AR$ {taxBreakdown.baseAmount.toFixed(2)}</p>
              <p>IVA (21%): AR$ {taxBreakdown.iva.toFixed(2)}</p>
              <p>Impuesto PAIS (8%): AR$ {taxBreakdown.pais.toFixed(2)}</p>
              <p>Impuesto a las Ganancias (30%): AR$ {taxBreakdown.ganancias.toFixed(2)}</p>
              <p>IIBB Buenos Aires (2%): AR$ {taxBreakdown.iibb.toFixed(2)}</p>
              <p>Total con impuestos: AR$ {taxBreakdown.total.toFixed(2)}</p>
            </div>
          )}
          <div className="space-y-2">
            <Label>Total en {fromCurrency} (incluyendo suscripciones)</Label>
            <Input value={`${totalOriginal.toFixed(2)} ${fromCurrency}`} readOnly />
          </div>
          <div className="space-y-2">
            <Label>Total en {toCurrency} (incluyendo suscripciones{fromCurrency === 'USD' && toCurrency === 'ARS' ? ' e impuestos' : ''})</Label>
            <Input value={`${totalConverted.toFixed(2)} ${toCurrency}`} readOnly />
          </div>
          {fromCurrency === 'USD' && toCurrency === 'ARS' && (
            <div className="text-sm text-muted-foreground">
              *Incluye IVA (21%), Impuesto PAIS (8%), Impuesto a las Ganancias (30%), e IIBB (2%)
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="w-full lg:w-1/3 shadow-lg">
        <CardHeader>
          <CardTitle>Suscripciones</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" value={openCategories} onValueChange={setOpenCategories}>
            {subscriptionCategories.map((category) => (
              <AccordionItem value={category.name} key={category.name}>
                <AccordionTrigger>{category.name}</AccordionTrigger>
                <AccordionContent>
                  {category.subscriptions.map((sub) => (
                    <div key={sub.name} className="flex items-center justify-between py-2">
                      <Label htmlFor={sub.name} className="flex items-center space-x-2">
                        <Switch
                          id={sub.name}
                          checked={selectedSubscriptions.includes(sub.name)}
                          onCheckedChange={() => handleSubscriptionToggle(sub.name)}
                        />
                        <span>{sub.name}</span>
                      </Label>
                      <span>{getConvertedPrice(sub.price)} {toCurrency}</span>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}