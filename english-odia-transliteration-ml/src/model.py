import pandas as pd
import numpy as np
import json
import warnings
warnings.filterwarnings('ignore')

# ML Libraries
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.metrics import confusion_matrix, classification_report

# Visualization
import matplotlib.pyplot as plt
import seaborn as sns

print("="*80)
print("  ENGLISH-ODIA TRANSLITERATION PROJECT")
print("  Using Decision Tree, Random Forest, AdaBoost, KNN, LDA")

import pandas as pd
import json

# Path to your JSON file
input_path = r"/content/ori_train.json"
output_path = r"/content/ori_train.csv"

#  Read line-by-line JSON
data = []
with open(input_path, 'r', encoding='utf-8') as f:
    for line_num, line in enumerate(f, 1):
        try:
            data.append(json.loads(line.strip()))
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON on line {line_num}: {e}")
            print(f"Problematic line content: {line.strip()}")
            
            continue


# Convert to DataFrame
df = pd.DataFrame(data)

# Save as CSV
df.to_csv(output_path, index=False, encoding='utf-8')

print(" JSONL successfully converted to CSV!")

file_path = r"/content/ori_train.csv"

with open(file_path, "r", encoding="utf-8") as f:
    for i in range(5):
        print(f.readline().strip())

import pandas as pd
import json

input_path = r"/content/ori_train.json"
output_path = r"/content/ori_train.csv"

data = []
with open(input_path, 'r', encoding='utf-8') as f:
    for line in f:
        if line.strip():  # skip empty lines
            try:
                data.append(json.loads(line))
            except json.JSONDecodeError:
                print("Skipping bad line:", line)

df = pd.DataFrame(data)
df.to_csv(output_path, index=False, encoding='utf-8-sig')

print(" Converted to CSV:", output_path)
print(df.head())

# See the no. of rows columns
print("Columns in dataset:\n", df.columns)
print("Shape (rows, columns):", df.shape)

df.info()


# Check missing values
print(df_train.isnull().sum())

# Drop or fill missing data if required
train_df = df_train.dropna()  # Removed inplace=True
# train_df.drop_duplicates(inplace = True) # Removed redundant line
# Check data types
print(train_df.dtypes) # Corrected variable name



print(train_df.columns)


#Normalization Code
train_df['english word'] = train_df['english word'].str.lower().str.strip()
train_df['native word'] = train_df['native word'].str.strip()


# Rename columns for easier access
train_df = train_df.rename(columns={
    'native word': 'odia',
    'english word': 'english'
})

# Check column names after renaming
print(train_df.columns)


# Remove very short words (less than 2 characters)
train_df = train_df[train_df['english'].astype(str).str.len() >= 2]
train_df = train_df[train_df['odia'].astype(str).str.len() >= 1]

print(f"✓ After filtering short words: {len(train_df)} rows remaining")


# Check unique English and Odia words
print(f"Unique English words: {train_df['english'].nunique()}")
print(f"Unique Odia words: {train_df['odia'].nunique()}")


import matplotlib.pyplot as plt

train_df['english_length'] = train_df['english'].str.len()
train_df['odia_length'] = train_df['odia'].str.len()

plt.figure(figsize=(10,5))
plt.hist(train_df['english_length'], bins=20)
plt.title("Distribution of English Word Lengths")
plt.xlabel("Word Length")
plt.ylabel("Frequency")
plt.show()


train_df['english'].value_counts().head(10).plot(kind='bar', figsize=(8,4), title='Top 10 English Words')


 #Step 4: Remove very short words (less than 2 characters)
train_df = train_df[train_df['english'].astype(str).str.len() >= 2]
train_df = train_df[train_df['odia'].astype(str).str.len() >= 1]
print(f"✓ After filtering short words: {len(train_df)} rows")

# Step 5: Remove words with special characters or numbers
train_df = train_df[~train_df['english'].str.contains(r'[^a-z]', regex=True)]
print(f"✓ After removing special characters/numbers: {len(train_df)} rows")


# Step 6: Reset index
train_df = train_df.reset_index(drop=True)


# Step 7: Summary info
initial_size = len(train_df)
print(f"\n Final cleaned dataset: {len(train_df)} rows")
print(f" Unique English words: {train_df['english'].nunique()}")
print(f" Unique Odia words: {train_df['odia'].nunique()}")

# For word-level transliteration (character splitting)
# Split English and Odia words into characters (tokens)
train_df['eng_tokens'] = train_df['english'].apply(lambda x: list(str(x)))
train_df['odia_tokens'] = train_df['odia'].apply(lambda x: list(str(x)))

# Check the first 5 rows to confirm
print(train_df[['english', 'odia', 'eng_tokens', 'odia_tokens']].head())
import pandas as pd
import numpy as np
import json
import warnings
warnings.filterwarnings('ignore')

# ML Libraries
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.discriminant_analysis import LinearDiscriminantAnalysis
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
from sklearn.metrics import confusion_matrix, classification_report

# Visualization
import matplotlib.pyplot as plt
import seaborn as sns

print("="*80)
print("  ENGLISH-ODIA TRANSLITERATION PROJECT")
print("  Using Decision Tree, Random Forest, AdaBoost, KNN, LDA")

import pandas as pd
import json

# Path to your JSON file
input_path = r"/content/ori_train.json"
output_path = r"/content/ori_train.csv"

#  Read line-by-line JSON
data = []
with open(input_path, 'r', encoding='utf-8') as f:
    for line_num, line in enumerate(f, 1):
        try:
            data.append(json.loads(line.strip()))
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON on line {line_num}: {e}")
            print(f"Problematic line content: {line.strip()}")
            
            continue


# Convert to DataFrame
df = pd.DataFrame(data)

# Save as CSV
df.to_csv(output_path, index=False, encoding='utf-8')

print(" JSONL successfully converted to CSV!")

file_path = r"/content/ori_train.csv"

with open(file_path, "r", encoding="utf-8") as f:
    for i in range(5):
        print(f.readline().strip())

import pandas as pd
import json

input_path = r"/content/ori_train.json"
output_path = r"/content/ori_train.csv"

data = []
with open(input_path, 'r', encoding='utf-8') as f:
    for line in f:
        if line.strip():  # skip empty lines
            try:
                data.append(json.loads(line))
            except json.JSONDecodeError:
                print("Skipping bad line:", line)

df = pd.DataFrame(data)
df.to_csv(output_path, index=False, encoding='utf-8-sig')

print(" Converted to CSV:", output_path)
print(df.head())

# See the no. of rows columns
print("Columns in dataset:\n", df.columns)
print("Shape (rows, columns):", df.shape)

df.info()


# Check missing values
print(df_train.isnull().sum())

# Drop or fill missing data if required
train_df = df_train.dropna()  # Removed inplace=True
# train_df.drop_duplicates(inplace = True) # Removed redundant line
# Check data types
print(train_df.dtypes) # Corrected variable name



print(train_df.columns)


#Normalization Code
train_df['english word'] = train_df['english word'].str.lower().str.strip()
train_df['native word'] = train_df['native word'].str.strip()


# Rename columns for easier access
train_df = train_df.rename(columns={
    'native word': 'odia',
    'english word': 'english'
})

# Check column names after renaming
print(train_df.columns)


# Remove very short words (less than 2 characters)
train_df = train_df[train_df['english'].astype(str).str.len() >= 2]
train_df = train_df[train_df['odia'].astype(str).str.len() >= 1]

print(f"✓ After filtering short words: {len(train_df)} rows remaining")


# Check unique English and Odia words
print(f"Unique English words: {train_df['english'].nunique()}")
print(f"Unique Odia words: {train_df['odia'].nunique()}")


import matplotlib.pyplot as plt

train_df['english_length'] = train_df['english'].str.len()
train_df['odia_length'] = train_df['odia'].str.len()

plt.figure(figsize=(10,5))
plt.hist(train_df['english_length'], bins=20)
plt.title("Distribution of English Word Lengths")
plt.xlabel("Word Length")
plt.ylabel("Frequency")
plt.show()


train_df['english'].value_counts().head(10).plot(kind='bar', figsize=(8,4), title='Top 10 English Words')


 #Step 4: Remove very short words (less than 2 characters)
train_df = train_df[train_df['english'].astype(str).str.len() >= 2]
train_df = train_df[train_df['odia'].astype(str).str.len() >= 1]
print(f"✓ After filtering short words: {len(train_df)} rows")

# Step 5: Remove words with special characters or numbers
train_df = train_df[~train_df['english'].str.contains(r'[^a-z]', regex=True)]
print(f"✓ After removing special characters/numbers: {len(train_df)} rows")


# Step 6: Reset index
train_df = train_df.reset_index(drop=True)


# Step 7: Summary info
initial_size = len(train_df)
print(f"\n Final cleaned dataset: {len(train_df)} rows")
print(f" Unique English words: {train_df['english'].nunique()}")
print(f" Unique Odia words: {train_df['odia'].nunique()}")

# For word-level transliteration (character splitting)
# Split English and Odia words into characters (tokens)
train_df['eng_tokens'] = train_df['english'].apply(lambda x: list(str(x)))
train_df['odia_tokens'] = train_df['odia'].apply(lambda x: list(str(x)))

# Check the first 5 rows to confirm
print(train_df[['english', 'odia', 'eng_tokens', 'odia_tokens']].head())
