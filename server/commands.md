```sh
python -m venv .venv
.venv\Scripts\activate
pip install pandas numpy matplotlib seaborn scikit-learn pyarrow jupyter
pip freeze > requirements.txt

python -m uvicorn app:app --reload

```
