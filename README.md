# AI Cyberattack Detection System (React + TypeScript)

An interactive, responsive machine-learning cyberattack detection web application rewritten from Python/Streamlit to React, TypeScript, Vite, and Tailwind CSS.

## Overview

This application serves as a defensive ML prototype for classifying network flow records based on the UNSW-NB15 benchmark dataset. It provides a complete defensive intrusion analysis workflow:
- Preprocessing and feature alignment across 42 network-flow parameters.
- Benchmark comparison between Random Forest (150 trees, balanced weights) and Logistic Regression.
- Batch traffic prediction from custom CSV files or pre-configured UNSW-NB15 sample sets (Attacks, Normal Web Traffic, Mixed Flows).
- Real-time interactive Flow Simulator allowing live tuning of primary features (TTL, connection rates, recurrence density).
- Ground-truth evaluation computing accuracy, precision, recall, F1-score, and confusion matrices.
- Academic Project Report generator with printable/copyable LaTeX/Markdown outputs.

## Evaluated Models (UNSW-NB15 Test Set - 175,341 Records)

| Model Algorithm | Accuracy | Precision | Recall | F1-Score | ROC-AUC |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Random Forest** (Selected) | **90.47%** | **98.73%** | **87.12%** | **92.56%** | **98.29%** |
| **Logistic Regression** | 86.39% | 98.43% | 81.31% | 89.05% | 97.81% |

## Application Pages & Features

1. **Overview**: Executive summary, pipeline architecture diagram, 3-metric highlight cards, and comparative bar visualizations.
2. **Traffic Prediction**: Drag-and-drop CSV upload, 1-click UNSW-NB15 flow test batches, batch metrics, class distribution charts, ground-truth evaluation, search/filtering, and CSV export (`cyberattack_predictions.csv`).
3. **Flow Simulator**: Interactive single-flow parameter tester with live threat score gauge, threat indicators, and preset scenarios.
4. **Model Performance**: Test metrics table, interactive confusion matrices for both models (TN/FP/FN/TP), and top Random Forest feature importances with sorting and filtering.
5. **Project Report**: Complete academic mini-project report aligned with university coursework templates, complete with editable student details and PDF/print support.
6. **About**: Dataset specifications, ethical use guidance, limitations, and searchable 42-feature glossary.

## Development

```bash
# Install dependencies
npm install

# Start development server on port 3000
npm run dev

# Build production bundle
npm run build
```
