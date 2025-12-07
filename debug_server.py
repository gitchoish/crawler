import subprocess
import time
import urllib.request
import json
import sys
import os
import io

def run_debug():
    # Force UTF-8 encoding for stdout/stderr
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

    print("Starting uvicorn server on port 8010...", flush=True)
    
    # Calculate paths
    root_dir = os.path.dirname(os.path.abspath(__file__))
    api_dir = os.path.join(root_dir, "api")
    
    env = os.environ.copy()
    # Add root dir to PYTHONPATH so bs_crwal can be found if needed (though crawler_service adds it)
    # AND add api dir so 'models' can be found
    env["PYTHONPATH"] = f"{root_dir}{os.pathsep}{api_dir}"
    env["PYTHONIOENCODING"] = "utf-8"
    
    # Run uvicorn using 'py -m' from 'api' directory
    cmd = ["py", "-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8010"]
    
    print(f"Executing: {' '.join(cmd)}")
    print(f"CWD: {api_dir}")
    
    proc = subprocess.Popen(
        cmd,
        cwd=api_dir, # Run from api directory
        env=env,
        stderr=subprocess.PIPE,
        stdout=subprocess.PIPE
    )
    
    try:
        print("Waiting for server to start (10s)...", flush=True)
        time.sleep(10)
        
        url = "http://127.0.0.1:8010/api/crawl"
        data = {
            "product_url": "https://brand.naver.com/denps/products/11261507716",
            "rating_filter": None,
            "max_reviews": 10
        }
        
        print(f"Sending POST request to {url}...", flush=True)
        req = urllib.request.Request(
            url, 
            data=json.dumps(data).encode('utf-8'), 
            headers={'Content-Type': 'application/json'}
        )
        
        with urllib.request.urlopen(req) as response:
            print(f"Status: {response.status}")
            print(f"Response: {response.read().decode('utf-8')}")
            
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code} - {e.reason}", flush=True)
        error_content = e.read().decode('utf-8', errors='replace')
        print(f"Error Content: {error_content}", flush=True)
    except Exception as e:
        print(f"Connection Failed: {e}", flush=True)
    finally:
        print("Terminating server...", flush=True)
        proc.terminate()
        try:
            outs, errs = proc.communicate(timeout=5)
            print("--- Server Output ---")
            print(outs.decode('utf-8', errors='replace'))
            print("--- Server Errors ---")
            print(errs.decode('utf-8', errors='replace'))
        except subprocess.TimeoutExpired:
            proc.kill()
            print("Server process killed.")

if __name__ == "__main__":
    run_debug()
