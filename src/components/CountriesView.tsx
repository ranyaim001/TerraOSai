'use client';

import { useState, useMemo } from 'react';
import { countries } from '@/data/countries';
import styles from './CountriesView.module.css';

interface CountriesViewProps {
    onClose: () => void;
}

export default function CountriesView({ onClose }: CountriesViewProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCountries = useMemo(() => {
        if (!searchTerm.trim()) {
            return countries;
        }

        const search = searchTerm.toLowerCase();
        return countries.filter(country =>
            country.name.toLowerCase().includes(search) ||
            country.code.toLowerCase().includes(search)
        );
    }, [searchTerm]);

    const continents = useMemo(() => {
        const continentMap: { [key: string]: number } = {};
        // Simple continent classification based on country codes
        countries.forEach(country => {
            const code = country.code;
            // This is a simplified classification
            if (['DZ', 'AO', 'BJ', 'BW', 'BF', 'BI', 'CM', 'CV', 'CF', 'TD', 'KM', 'CG', 'CD', 'CI', 'DJ', 'EG', 'GQ', 'ER', 'ET', 'GA', 'GM', 'GH', 'GN', 'GW', 'KE', 'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'MA', 'MZ', 'NA', 'NE', 'NG', 'RW', 'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'SS', 'SD', 'SZ', 'TZ', 'TG', 'TN', 'UG', 'ZM', 'ZW'].includes(code)) {
                continentMap['Africa'] = (continentMap['Africa'] || 0) + 1;
            } else if (['AF', 'AM', 'AZ', 'BH', 'BD', 'BT', 'BN', 'KH', 'CN', 'CY', 'GE', 'IN', 'ID', 'IR', 'IQ', 'IL', 'JP', 'JO', 'KZ', 'KW', 'KG', 'LA', 'LB', 'MY', 'MV', 'MN', 'MM', 'NP', 'KP', 'OM', 'PK', 'PS', 'PH', 'QA', 'SA', 'SG', 'KR', 'LK', 'SY', 'TW', 'TJ', 'TH', 'TL', 'TR', 'TM', 'AE', 'UZ', 'VN', 'YE'].includes(code)) {
                continentMap['Asia'] = (continentMap['Asia'] || 0) + 1;
            } else if (['AL', 'AD', 'AT', 'BY', 'BE', 'BA', 'BG', 'HR', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IS', 'IE', 'IT', 'LV', 'LI', 'LT', 'LU', 'MK', 'MT', 'MD', 'MC', 'ME', 'NL', 'NO', 'PL', 'PT', 'RO', 'RU', 'SM', 'RS', 'SK', 'SI', 'ES', 'SE', 'CH', 'UA', 'GB', 'VA'].includes(code)) {
                continentMap['Europe'] = (continentMap['Europe'] || 0) + 1;
            } else if (['AG', 'BS', 'BB', 'BZ', 'CA', 'CR', 'CU', 'DM', 'DO', 'SV', 'GD', 'GT', 'HT', 'HN', 'JM', 'MX', 'NI', 'PA', 'KN', 'LC', 'VC', 'TT', 'US'].includes(code)) {
                continentMap['North America'] = (continentMap['North America'] || 0) + 1;
            } else if (['AU', 'FJ', 'KI', 'MH', 'FM', 'NR', 'NZ', 'PW', 'PG', 'WS', 'SB', 'TO', 'TV', 'VU'].includes(code)) {
                continentMap['Oceania'] = (continentMap['Oceania'] || 0) + 1;
            } else {
                continentMap['South America'] = (continentMap['South America'] || 0) + 1;
            }
        });
        return continentMap;
    }, []);

    return (
        <div className={styles.countriesView}>
            <button className={styles.backButton} onClick={onClose}>
                ← Back to Dashboard
            </button>

            <div className={styles.header}>
                <h1 className={styles.title}>🌍 195 Countries Connected</h1>
                <p className={styles.subtitle}>
                    Exploring our global community across all continents
                </p>

                <div className={styles.searchBar}>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Search countries by name or code..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className={styles.stats}>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{filteredCountries.length}</div>
                        <div className={styles.statLabel}>
                            {searchTerm ? 'Results' : 'Total Countries'}
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>{Object.keys(continents).length}</div>
                        <div className={styles.statLabel}>Continents</div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statValue}>8.1B</div>
                        <div className={styles.statLabel}>Global Population</div>
                    </div>
                </div>
            </div>

            {filteredCountries.length > 0 ? (
                <div className={styles.countriesGrid}>
                    {filteredCountries.map((country, index) => (
                        <div
                            key={country.code}
                            className={styles.countryCard}
                            style={{ animationDelay: `${Math.min(index * 0.05, 0.3)}s` }}
                        >
                            <div className={styles.flag}>{country.flag}</div>
                            <div className={styles.countryInfo}>
                                <div className={styles.countryName}>{country.name}</div>
                                <div className={styles.countryCode}>{country.code}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className={styles.noResults}>
                    No countries found matching &quot;{searchTerm}&quot;
                </div>
            )}
        </div>
    );
}
